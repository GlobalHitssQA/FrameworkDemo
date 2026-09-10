# frozen_string_literal: true

# QA-CP131 — Solicitud de PIN al reproducir un evento de canal bloqueado en la EPG.
# Plataforma: Android (Fire TV / Android TV) con Appium UiAutomator2.

# Endpoint real documentado en los insumos (ADTCL-308 / ADTCL-142).
CHANNELS_CHECK_PATH = '/user/v2/controlpin/channels/check'

Given('que el usuario selecciona un evento de un canal bloqueado en la guía de programación') do
  ensure_appium!
  require_config!(*EpgPinPage::LOCATOR_KEYS, 'BLOCKED_EVENT_ID')

  epg = page(EpgPinPage)
  epg.open_blocked_event

  # El evento abierto debe ser exactamente el event_id esperado por el escenario.
  opened = epg.opened_event_id
  expect(opened).to eq(TestConfig['BLOCKED_EVENT_ID']),
                    "El evento abierto (#{opened}) no coincide con BLOCKED_EVENT_ID"
end

When('el usuario selecciona la opción de reproducir el evento del canal bloqueado en la EPG') do
  page(EpgPinPage).choose_play
end

Then('el API {string} responde con status 200 y channels_check en true') do |api_path|
  expect(api_path).to eq(CHANNELS_CHECK_PATH)
  require_config!('API_BASE_URL', 'AUTH_HEADER_NAME', 'SESSION_TOKEN',
                  'CHANNELS_CHECK_QUERY', 'BLOCKED_CHANNEL_ID')

  url = "#{TestConfig['API_BASE_URL']}#{CHANNELS_CHECK_PATH}" \
        "?#{TestConfig['CHANNELS_CHECK_QUERY']}=#{TestConfig['BLOCKED_CHANNEL_ID']}"
  headers = { TestConfig['AUTH_HEADER_NAME'] => TestConfig['SESSION_TOKEN'] }

  result = ApiClient.boolean_field(url, 'channels_check', headers)

  # Distinguir explícitamente "no fue posible determinar" de "no bloqueado".
  expect(result.determinable?).to be(true),
                                  "No fue posible determinar el estado de bloqueo: #{result.error}"
  expect(result.status).to eq(200)
  expect(result.value).to be(true),
                          'channels_check no es true: el canal no quedó marcado como bloqueado'
end

Then('se muestra la pantalla para ingresar el PIN de seguridad') do
  expect(page(EpgPinPage).pin_screen_visible?).to be(true),
                                                  'No se mostró la pantalla para ingresar el PIN de seguridad'
end

Then('el evento no se reproduce mientras no se valide el PIN de seguridad') do
  # Señal positiva previa: la pantalla de PIN ya está visible (paso anterior).
  # Se verifica que el reproductor permanezca ausente durante un intervalo acotado.
  expect(page(EpgPinPage).player_absent?).to be(true),
                                             'El evento inició reproducción sin validar el PIN'
end
