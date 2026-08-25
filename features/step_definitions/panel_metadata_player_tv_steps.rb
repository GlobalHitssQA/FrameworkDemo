# frozen_string_literal: true

# Step definitions para la corrida del Panel de Metadata del Player de TV.
# IDs: QC-CP001, QC-CP002, QA-CP003. Plataforma: Android (Appium/UiAutomator2).
#
# Los Page Objects se cargan via require_relative en features/support/env.rb.
# Las precondiciones (sesion, derecho de reproduccion, evento, puntos de entrada)
# se establecen y verifican REALMENTE antes del When. Cuando faltan locators,
# datos o mecanismos reales, el step se marca como pendiente/no ejecutable de
# forma controlada (helper require_inputs! / ensure_driver!), nunca con un raise
# incondicional.

# ---------------------------------------------------------------------------
# Precondiciones (Given / Background)
# ---------------------------------------------------------------------------

Given('un usuario con sesion activa en la aplicacion de TV') do
  ensure_driver!
  require_inputs!('LOC_SESSION_INDICATOR' => ENV['LOC_SESSION_INDICATOR'])

  @session_page = SessionPage.new(tv_session)

  # Si aun no hay sesion, intentar establecerla con credenciales/locators reales.
  if @session_page.authenticated? != true
    require_inputs!(
      'TV_USER' => ENV['TV_USER'],
      'TV_PASSWORD' => ENV['TV_PASSWORD'],
      'LOC_LOGIN_USER_FIELD' => ENV['LOC_LOGIN_USER_FIELD'],
      'LOC_LOGIN_PASSWORD_FIELD' => ENV['LOC_LOGIN_PASSWORD_FIELD'],
      'LOC_LOGIN_SUBMIT' => ENV['LOC_LOGIN_SUBMIT']
    )
    @session_page.sign_in(ENV['TV_USER'], ENV['TV_PASSWORD'])
  end

  # Verificacion mediante una senal propia de sesion (usuario autenticado),
  # NO mediante la visibilidad del player u otro componente funcional.
  expect(@session_page.authenticated?).to eq(true),
                                          'No se pudo verificar una sesion activa mediante el indicador de usuario autenticado.'
end

Given('el nuevo panel de metadata esta desplegado en el ambiente de prueba') do
  ensure_driver!
  @metadata_panel = MetadataPanelPage.new(tv_session)

  # "Desplegado en el ambiente" se ata a que el panel exista y su estructura
  # este definida en esta build/config (locator del contenedor y campos reales).
  unless @metadata_panel.descriptor_definable?
    pending(
      'El nuevo panel de metadata no esta definido en el ambiente: proveer ' \
      'LOC_METADATA_PANEL_CONTAINER y METADATA_FIELD_IDS reales.'
    )
  end
end

Given('existe un evento en vivo con derecho de reproduccion disponible para el usuario') do
  ensure_driver!
  event_id = ENV['LIVE_EVENT_WITH_RIGHTS_ID']
  require_inputs!(
    'LIVE_EVENT_WITH_RIGHTS_ID' => event_id,
    'TV_ENTITLEMENT_ENDPOINT' => ENV['TV_ENTITLEMENT_ENDPOINT'],
    'TV_ENTITLEMENT_FIELD' => ENV['TV_ENTITLEMENT_FIELD']
  )

  @player_page ||= TvPlayerPage.new(tv_session)
  entitled = @player_page.entitlement_for(event_id)

  # No se asume el derecho por declararlo: se verifica el estado efectivo.
  expect(entitled).to eq(true),
                      "El evento '#{event_id}' no presenta derecho de reproduccion efectivo; no se asume el derecho."

  scenario_store[:event_id] = event_id
  scenario_store[:expected_right] = true
end

Given('existe un evento en vivo para el cual el usuario no tiene derecho de reproduccion') do
  ensure_driver!
  event_id = ENV['LIVE_EVENT_WITHOUT_RIGHTS_ID']
  require_inputs!(
    'LIVE_EVENT_WITHOUT_RIGHTS_ID' => event_id,
    'TV_ENTITLEMENT_ENDPOINT' => ENV['TV_ENTITLEMENT_ENDPOINT'],
    'TV_ENTITLEMENT_FIELD' => ENV['TV_ENTITLEMENT_FIELD']
  )

  @player_page ||= TvPlayerPage.new(tv_session)
  entitled = @player_page.entitlement_for(event_id)

  # Se verifica el estado efectivo: el usuario NO debe tener derecho.
  expect(entitled).to eq(false),
                      "El evento '#{event_id}' si presenta derecho de reproduccion; no cumple la precondicion sin derecho."

  scenario_store[:event_id] = event_id
  scenario_store[:expected_right] = false
end

Given('los puntos de entrada al player definidos en el requerimiento estan habilitados') do
  ensure_driver!
  raw = ENV['TV_ENTRY_POINTS']
  require_inputs!('TV_ENTRY_POINTS' => raw)

  slugs = raw.split(',').map(&:strip).reject(&:empty?)
  if slugs.size < 2
    pending(
      'Se requieren al menos 2 puntos de entrada reales en TV_ENTRY_POINTS para ' \
      'comparar consistencia entre variantes.'
    )
  end

  entry_points = slugs.map do |slug|
    env_key = "TV_ENTRY_POINT_#{slug.upcase}_LOCATOR"
    { slug: slug, env_key: env_key, locator: ENV[env_key] }
  end

  missing = entry_points.reject { |ep| ep[:locator] && !ep[:locator].strip.empty? }
  unless missing.empty?
    require_inputs!(missing.each_with_object({}) { |ep, h| h[ep[:env_key]] = nil })
  end

  scenario_store[:entry_points] = entry_points
end

# ---------------------------------------------------------------------------
# Acciones (When)
# ---------------------------------------------------------------------------

When('el usuario accede al evento en vivo con derecho de reproduccion desde el player de TV') do
  ensure_driver!
  @player_page ||= TvPlayerPage.new(tv_session)
  entry_locator = ENV['TV_DEFAULT_ENTRY_POINT_LOCATOR']
  require_inputs!('TV_DEFAULT_ENTRY_POINT_LOCATOR' => entry_locator)

  opened = @player_page.open_event_from_entry_point(entry_locator)
  expect(opened).to eq(true),
                    'No fue posible abrir el evento en vivo desde el punto de entrada configurado.'
end

When('el usuario accede al evento en vivo sin derecho de reproduccion desde el player de TV') do
  ensure_driver!
  @player_page ||= TvPlayerPage.new(tv_session)
  entry_locator = ENV['TV_DEFAULT_ENTRY_POINT_LOCATOR']
  require_inputs!('TV_DEFAULT_ENTRY_POINT_LOCATOR' => entry_locator)

  opened = @player_page.open_event_from_entry_point(entry_locator)
  expect(opened).to eq(true),
                    'No fue posible intentar abrir el evento en vivo sin derecho desde el punto de entrada configurado.'
end

When('el usuario accede al evento en vivo desde cada punto de entrada listado') do
  ensure_driver!
  entry_points = scenario_store[:entry_points]
  require_inputs!('TV_ENTRY_POINTS (precondicion de puntos de entrada)' => entry_points)

  @player_page ||= TvPlayerPage.new(tv_session)
  panel = MetadataPanelPage.new(tv_session)
  unless panel.descriptor_definable?
    pending(
      'Estructura del panel no definida: proveer LOC_METADATA_PANEL_CONTAINER y ' \
      'METADATA_FIELD_IDS reales para comparar entre puntos de entrada.'
    )
  end

  exit_locator = ENV['LOC_PLAYER_EXIT']
  require_inputs!('LOC_PLAYER_EXIT' => exit_locator)

  captures = []
  entry_points.each_with_index do |ep, idx|
    opened = @player_page.open_event_from_entry_point(ep[:locator])
    expect(opened).to eq(true),
                      "No fue posible abrir el evento desde el punto de entrada '#{ep[:slug]}'."

    expect(panel.visible_panel?).to eq(true),
                                    "El panel de metadata no se visualizo desde el punto de entrada '#{ep[:slug]}'."

    captures << { slug: ep[:slug], descriptor: panel.descriptor }

    # Salir del player antes de reingresar desde el siguiente punto de entrada.
    @player_page.exit_player(exit_locator) unless idx == entry_points.size - 1
  end

  scenario_store[:captures] = captures
end

# ---------------------------------------------------------------------------
# Verificaciones (Then) - QC-CP001 (con derecho)
# ---------------------------------------------------------------------------

Then('el player de TV inicia la reproduccion del evento en vivo sin errores') do
  require_inputs!('LOC_PLAYER_PLAYING_INDICATOR' => ENV['LOC_PLAYER_PLAYING_INDICATOR'])
  @player_page ||= TvPlayerPage.new(tv_session)

  expect(@player_page.playback_started?).to eq(true),
                                            'La reproduccion del evento en vivo no inicio dentro del tiempo esperado.'
end

Then('el nuevo panel de metadata se visualiza sobre el player conforme al insumo definido') do
  @metadata_panel ||= MetadataPanelPage.new(tv_session)
  unless @metadata_panel.descriptor_definable?
    pending('Panel no definido: proveer LOC_METADATA_PANEL_CONTAINER y METADATA_FIELD_IDS reales.')
  end

  expect(@metadata_panel.visible_panel?).to eq(true),
                                            'El nuevo panel de metadata no se visualizo sobre el player.'
end

Then('la metadata mostrada corresponde con la informacion del evento en vivo y es legible') do
  @metadata_panel ||= MetadataPanelPage.new(tv_session)
  unless @metadata_panel.descriptor_definable?
    pending('Panel no definido: proveer LOC_METADATA_PANEL_CONTAINER y METADATA_FIELD_IDS reales.')
  end

  expect(@metadata_panel.readable_metadata?).to eq(true),
                                                'La metadata del panel no es legible (campos vacios o ausentes).'
end

Then('la reproduccion del evento en vivo continua sin interrupciones mientras el panel esta visible') do
  require_inputs!('LOC_PLAYER_PLAYING_INDICATOR' => ENV['LOC_PLAYER_PLAYING_INDICATOR'])
  @player_page ||= TvPlayerPage.new(tv_session)
  @metadata_panel ||= MetadataPanelPage.new(tv_session)

  expect(@metadata_panel.visible_panel?).to eq(true),
                                            'El panel de metadata no esta visible durante la validacion de reproduccion continua.'
  expect(@player_page.still_playing?).to eq(true),
                                         'La reproduccion se interrumpio mientras el panel de metadata estaba visible.'
end

# ---------------------------------------------------------------------------
# Verificaciones (Then) - QA-CP003 (sin derecho)
# ---------------------------------------------------------------------------

Then('el player de TV no inicia la reproduccion y muestra el manejo previsto por falta de derecho') do
  require_inputs!(
    'LOC_ACCESS_DENIED_INDICATOR' => ENV['LOC_ACCESS_DENIED_INDICATOR'],
    'LOC_PLAYER_PLAYING_INDICATOR' => ENV['LOC_PLAYER_PLAYING_INDICATOR']
  )
  @player_page ||= TvPlayerPage.new(tv_session)

  # 1) Senal positiva de que el sistema termino de procesar: manejo por falta de derecho.
  expect(@player_page.access_denied_shown?).to eq(true),
                                               'No se mostro el manejo previsto por falta de derecho de reproduccion.'
  # 2) Verificar que la reproduccion permanece ausente en un intervalo acotado.
  expect(@player_page.playback_absent_after_denial?).to eq(true),
                                                        'Se inicio reproduccion pese a la falta de derecho.'
end

Then('el panel de metadata no se muestra para el evento sin derecho de reproduccion') do
  require_inputs!('LOC_ACCESS_DENIED_INDICATOR' => ENV['LOC_ACCESS_DENIED_INDICATOR'])
  @metadata_panel ||= MetadataPanelPage.new(tv_session)
  @player_page ||= TvPlayerPage.new(tv_session)
  unless @metadata_panel.container_locator
    pending('Panel no definido: proveer LOC_METADATA_PANEL_CONTAINER real.')
  end

  # Tras la senal positiva de acceso denegado, confirmar ausencia del panel.
  expect(@player_page.access_denied_shown?).to eq(true),
                                               'No se confirmo el manejo por falta de derecho antes de validar la ausencia del panel.'
  expect(@metadata_panel.panel_absent?).to eq(true),
                                           'El panel de metadata se mostro para un evento sin derecho de reproduccion.'
end

Then('el player de TV mantiene su comportamiento base sin regresiones ni errores no controlados') do
  base_state = ENV['LOC_PLAYER_BASE_STATE']
  require_inputs!('LOC_PLAYER_BASE_STATE' => base_state)
  @player_page ||= TvPlayerPage.new(tv_session)

  # El player/app permanece en un estado base controlado (sin crash/regresion).
  expect(@player_page.base_state_ok?(base_state)).to eq(true),
                                                     'El player no conservo su estado base tras la falta de derecho (posible regresion).'
end

Then('los registros del player muestran el acceso denegado sin excepciones tecnicas no controladas') do
  ensure_driver!
  require_inputs!(
    'LOG_TYPE' => ENV['LOG_TYPE'],
    'LOG_ACCESS_DENIED_MARKER' => ENV['LOG_ACCESS_DENIED_MARKER'],
    'LOG_UNHANDLED_EXCEPTION_MARKERS' => ENV['LOG_UNHANDLED_EXCEPTION_MARKERS']
  )
  @player_page ||= TvPlayerPage.new(tv_session)

  logs = @player_page.device_logs
  expect(logs).not_to be_nil, 'No fue posible obtener los registros del dispositivo.'

  expect(logs).to include(ENV['LOG_ACCESS_DENIED_MARKER']),
                  'No se registro el evento de acceso denegado esperado en los logs.'

  ENV['LOG_UNHANDLED_EXCEPTION_MARKERS'].split('|').map(&:strip).reject(&:empty?).each do |marker|
    expect(logs).not_to include(marker),
                        "Se detecto una excepcion tecnica no controlada en los logs: #{marker}."
  end
end

# ---------------------------------------------------------------------------
# Verificaciones (Then) - QC-CP002 (consistencia entre puntos de entrada)
# ---------------------------------------------------------------------------

Then('el panel de metadata se visualiza correctamente en cada punto de entrada') do
  captures = scenario_store[:captures]
  expect(captures).not_to be_nil, 'No se capturaron datos del panel por punto de entrada.'
  expect(captures.size).to be >= 2

  captures.each do |capture|
    expect(capture[:descriptor]).not_to be_nil,
                                        "No se obtuvo el descriptor del panel para el punto de entrada '#{capture[:slug]}'."
  end
end

Then('el panel de metadata mantiene identidad de campos, controles, estructura, estados y orden entre los puntos de entrada') do
  captures = scenario_store[:captures]
  expect(captures.size).to be >= 2,
                           'Se requieren al menos 2 capturas (puntos de entrada) para comparar consistencia.'

  # Baseline capturado del PRIMER punto de entrada dentro de este mismo escenario.
  # Se compara contra los puntos de entrada RESTANTES (nunca contra si mismo).
  baseline = captures.first
  captures.drop(1).each do |capture|
    expect(capture[:descriptor][:order]).to eq(baseline[:descriptor][:order]),
                                            "El orden de campos difiere entre '#{baseline[:slug]}' y '#{capture[:slug]}'."
    expect(capture[:descriptor][:fields]).to eq(baseline[:descriptor][:fields]),
                                             "La identidad/estados/contenido de campos difiere entre '#{baseline[:slug]}' y '#{capture[:slug]}'."
    expect(capture[:descriptor][:controls]).to eq(baseline[:descriptor][:controls]),
                                               "La identidad/estados de controles difiere entre '#{baseline[:slug]}' y '#{capture[:slug]}'."
  end
end
