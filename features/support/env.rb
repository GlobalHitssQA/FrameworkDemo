# frozen_string_literal: true

# Soporte de Cucumber para los casos de esta corrida: QA-CP002, QA-CP003, QC-CP001.
#
# PLATAFORMA (rule 9): los insumos de esta corrida NO declaran plataforma (Web/Android/iOS).
# En consecuencia NO se elige un driver por defecto y NO se cargan dependencias de driver
# (ni Selenium ni Appium). La inicialización del driver queda explícitamente pendiente y
# los steps que dependen de la UI marcan el escenario como `pending` de forma controlada.
# Cuando la plataforma se declare, se cargará únicamente el driver correspondiente:
#   - Web     -> Selenium WebDriver
#   - Android -> Appium (UiAutomator2)
#   - iOS     -> Appium (XCUITest)

require 'rspec/expectations'
require 'net/http'
require 'json'
require 'uri'

# Registrar los matchers de RSpec en el World de Cucumber (rule 10).
World(RSpec::Matchers)

# Cucumber NO carga automáticamente los archivos bajo features/pages (rule 10):
# se requieren explícitamente los Page Objects generados para los IDs de esta corrida.
require_relative '../pages/player_tv_page'
require_relative '../pages/metadata_panel_page'

module PanelMetadataSupport
  SUPPORTED_PLATFORMS = %w[web android ios].freeze

  # -------------------------------------------------------------------------
  # Plataforma / driver
  # -------------------------------------------------------------------------
  def test_platform
    (ENV['TEST_PLATFORM'] || '').strip.downcase
  end

  def platform_declared?
    SUPPORTED_PLATFORMS.include?(test_platform)
  end

  # Marca el escenario como pendiente/no ejecutable de forma controlada (rule 16)
  # mientras la plataforma no esté declarada. No usa raise incondicional.
  def require_platform!
    return if platform_declared?

    pending(
      'Plataforma no declarada en los insumos (Web/Android/iOS). ' \
      'Defina TEST_PLATFORM y el driver correspondiente (Selenium para Web, ' \
      'Appium UiAutomator2 para Android, Appium XCUITest para iOS). ' \
      'Configuración de plataforma y locators pendiente.'
    )
  end

  # Acceso al driver. Mientras la plataforma no esté declarada, `require_platform!`
  # deja el escenario en pending antes de devolver cualquier driver.
  def driver
    require_platform!
    # Punto de inicialización del driver real una vez declarada la plataforma.
    # No se instancia ningún driver en esta corrida porque la plataforma es desconocida.
    @driver
  end

  def player_page
    @player_page ||= PlayerTvPage.new(driver)
  end

  def metadata_panel
    @metadata_panel ||= MetadataPanelPage.new(driver)
  end

  # -------------------------------------------------------------------------
  # Configuración por variables de entorno (sin valores ficticios, rule 12)
  # -------------------------------------------------------------------------
  def env_required(name)
    value = ENV[name]
    if value.nil? || value.strip.empty?
      pending("Configuración pendiente: defina la variable de entorno #{name} " \
              '(sin valores ficticios).')
    end
    value.strip
  end

  # -------------------------------------------------------------------------
  # HTTP helpers. Los errores de infraestructura (conexión/timeout) se propagan;
  # no se convierten en resultados de negocio (rule 28/29).
  # -------------------------------------------------------------------------
  def http_get(url, token = nil)
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == 'https')
    http.open_timeout = 10
    http.read_timeout = 15

    request = Net::HTTP::Get.new(uri.request_uri)
    request['Authorization'] = "Bearer #{token}" if token && !token.empty?
    cookie = ENV['SESSION_COOKIE']
    request['Cookie'] = cookie if cookie && !cookie.strip.empty?

    http.request(request)
  end

  def safe_json(body)
    JSON.parse(body)
  rescue JSON::ParserError
    nil
  end

  # -------------------------------------------------------------------------
  # Precondiciones reales de negocio (rules 13, 14, 29)
  # -------------------------------------------------------------------------

  # Sesión iniciada verificada mediante una señal propia de sesión (rule 14):
  # se valida el estado autenticado contra el servicio de sesión, NO mediante
  # la visibilidad del player u otro componente funcional.
  def ensure_authenticated_session
    return @session if @session

    url = env_required('SESSION_VALIDATION_URL')
    token = env_required('SESSION_TOKEN')

    response = http_get(url, token)
    expect(response.code.to_i).to eq(200)

    body = safe_json(response.body)
    pending('No fue posible validar la sesión: respuesta malformada del servicio de sesión.') if body.nil?

    unless body.key?('authenticated') && [true, false].include?(body['authenticated'])
      pending('No fue posible determinar el estado de sesión ' \
              '(campo authenticated ausente o con tipo inesperado).')
    end

    expect(body['authenticated']).to eq(true)

    @session = { token: token, user_id: body['user_id'] }
  end

  # Evento en vivo real, identificado por su event_id (rules 12, 30).
  def ensure_event_selected
    return @event if @event

    @event = { id: env_required('LIVE_EVENT_ID') }
  end

  # Verificación de entitlement/derecho de reproducción (rule 29).
  # Distingue "sin derecho" (false real) de "no determinable" (pending controlado).
  # La consulta corresponde al mismo usuario autenticado y al mismo evento del escenario.
  def entitlement_for_current_context
    ensure_authenticated_session
    ensure_event_selected

    base = env_required('ENTITLEMENT_SERVICE_URL')
    user_id = @session[:user_id]
    if user_id.nil? || user_id.to_s.strip.empty?
      pending('No fue posible determinar el usuario autenticado para la consulta de entitlement.')
    end

    separator = base.include?('?') ? '&' : '?'
    url = "#{base}#{separator}user_id=#{URI.encode_www_form_component(user_id.to_s)}" \
          "&event_id=#{URI.encode_www_form_component(@event[:id])}"

    response = http_get(url, @session[:token])

    unless response.code.to_i == 200
      pending("No fue posible determinar el derecho de reproducción: HTTP #{response.code}.")
    end

    body = safe_json(response.body)
    pending('No fue posible determinar el derecho de reproducción: respuesta malformada.') if body.nil?

    unless body.key?('entitled') && [true, false].include?(body['entitled'])
      pending('No fue posible determinar el derecho de reproducción ' \
              '(campo entitled ausente o con tipo inesperado). ' \
              'Una falla o schema inesperado no se interpreta como false.')
    end

    body['entitled']
  end

  # -------------------------------------------------------------------------
  # Backend de metadata (rules 17, 29, 31)
  # -------------------------------------------------------------------------
  def fetch_backend_metadata(event_id)
    base = env_required('METADATA_BACKEND_URL')
    separator = base.include?('?') ? '&' : '?'
    url = "#{base}#{separator}event_id=#{URI.encode_www_form_component(event_id)}"

    response = http_get(url, @session && @session[:token])
    expect(response.code.to_i).to eq(200)

    body = safe_json(response.body)
    pending('La respuesta del backend de metadata está malformada.') if body.nil?
    expect(body).to be_a(Hash)
    body
  end

  # Campos obligatorios de metadata definidos por los insumos (rule 31).
  # No se inventan: deben proveerse por entorno (CSV de llaves).
  def metadata_required_fields
    raw = env_required('METADATA_REQUIRED_FIELDS')
    fields = raw.split(',').map(&:strip).reject(&:empty?)
    pending('No se definieron los campos obligatorios de metadata (METADATA_REQUIRED_FIELDS).') if fields.empty?
    fields
  end

  # Límites de conteo de caracteres por campo (insumo "llaves y conteo de caracteres").
  # No se inventan: deben proveerse por entorno como JSON { "campo": max }.
  def metadata_char_limits
    raw = env_required('METADATA_CHAR_LIMITS')
    parsed = safe_json(raw)
    if !parsed.is_a?(Hash) || parsed.empty?
      pending('No se definieron los límites de conteo de caracteres de metadata ' \
              '(METADATA_CHAR_LIMITS con formato JSON { "campo": max }).')
    end
    parsed
  end
end

World(PanelMetadataSupport)
