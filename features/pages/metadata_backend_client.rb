# frozen_string_literal: true

require 'net/http'
require 'json'
require 'uri'

# Cliente del servicio de metadata del backend (usado por TC005 - Integracion).
#
# No contiene URLs, endpoints ni tokens ficticios: todo proviene de variables de entorno
# gestionadas en features/support/env.rb (MetadataTvConfig). Los valores faltantes se
# reportan como configuracion pendiente (TODO) al momento de la ejecucion.
class MetadataBackendClient
  def initialize(base_url: MetadataTvConfig.backend_metadata_base_url,
                 token: MetadataTvConfig.backend_auth_token)
    @base_url = base_url
    @token = token
  end

  # Consulta la metadata del evento en el backend y devuelve un hash de campos.
  # event_id: identificador del evento en vivo (debe provenir de datos reales de la corrida).
  def metadata_evento(event_id)
    require_config!(@base_url, 'METADATA_BACKEND_URL')
    if event_id.nil? || event_id.to_s.strip.empty?
      raise 'TODO: identificador de evento pendiente. Provea EVENTO_EN_VIVO_ID con el id real ' \
            'del evento en vivo para consultar el backend de metadata.'
    end

    uri = URI.join(@base_url.to_s.chomp('/') + '/', event_id.to_s)
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{@token}" unless @token.nil? || @token.to_s.strip.empty?
    request['Accept'] = 'application/json'

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end

    JSON.parse(response.body)
  end

  private

  def require_config!(value, env_name)
    return unless value.nil? || value.to_s.strip.empty?

    raise "TODO: configuracion pendiente. Defina #{env_name} con la URL real del servicio de " \
          'metadata del backend (no se permite inventar URLs).'
  end
end
