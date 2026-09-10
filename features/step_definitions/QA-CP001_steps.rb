# frozen_string_literal: true

# QA-CP001 — Reproducción del canal default en el primer acceso a TV en vivo.
# Plataforma: Android (Fire TV / Android TV) con Appium UiAutomator2.

# Endpoint real de configuración de la operación (base desde entorno).
DEFAULT_CHANNEL_HEADERS = %w[API_BASE_URL DEFAULT_CHANNEL_ENDPOINT AUTH_HEADER_NAME SESSION_TOKEN].freeze

Given('que es la primera vez que el perfil accede al entorno de TV en vivo') do
  # La condición de "primer acceso" debe prepararla realmente el harness sobre un
  # perfil sin historial. Se exige la identidad del perfil y la confirmación de
  # preparación; sin ese mecanismo real el escenario no es ejecutable.
  require_config!('FIRST_ACCESS_PROFILE_ID', 'FIRST_ACCESS_READY')
  expect(TestConfig['FIRST_ACCESS_READY']).to eq('true'),
                                               'El harness no confirmó un perfil preparado sin historial (FIRST_ACCESS_READY != true)'
  @first_access_profile_id = TestConfig['FIRST_ACCESS_PROFILE_ID']
end

Given('que la operación tiene configurado un canal default') do
  require_config!(*DEFAULT_CHANNEL_HEADERS, 'DEFAULT_CHANNEL_FIELD')

  url = "#{TestConfig['API_BASE_URL']}#{TestConfig['DEFAULT_CHANNEL_ENDPOINT']}"
  headers = { TestConfig['AUTH_HEADER_NAME'] => TestConfig['SESSION_TOKEN'] }
  @config_status, body = ApiClient.get_json(url, headers)

  expect(@config_status).to eq(200),
                            "El servicio de configuración no respondió 200 (status=#{@config_status})"
  expect(body).to be_a(Hash), 'La respuesta del servicio de configuración no es un objeto JSON válido'

  field = TestConfig['DEFAULT_CHANNEL_FIELD']
  expect(body).to have_key(field), "La respuesta no contiene el campo del canal default '#{field}'"

  @default_channel_id = body[field].to_s.strip
  expect(@default_channel_id).not_to be_empty, 'El canal default configurado llegó vacío'
end

When('el usuario ingresa a TV en vivo desde el menú principal') do
  ensure_appium!
  require_config!(*TvEnVivoPage::LOCATOR_KEYS)
  page(TvEnVivoPage).open_live_tv_from_main_menu
end

Then('la aplicación abre la pantalla de TV en vivo sin historial de canal previo') do
  tv = page(TvEnVivoPage)
  expect(tv.live_tv_screen_ready?).to be(true), 'No se abrió la pantalla de TV en vivo'
  expect(tv.channel_history_present?).to be(false),
                                         'Se detectó historial de canal previo; no corresponde a un primer acceso'
end

Then('el servicio de configuración de la operación responde el canal default con status 200') do
  # Se apoya en la consulta real ejecutada en la precondición (mismo usuario).
  expect(@config_status).to eq(200)
  expect(@default_channel_id).not_to be_nil
  expect(@default_channel_id).not_to be_empty
end

Then('se inicia la reproducción del canal configurado por default por la operación') do
  expect(page(TvEnVivoPage).player_started?).to be(true),
                                                'No se inició la reproducción en TV en vivo'
end

Then('el canal reproducido coincide exactamente con el canal default de la operación') do
  reproduced = page(TvEnVivoPage).current_channel_id
  expect(reproduced).not_to be_nil, 'No se pudo leer el canal en reproducción'
  # Comparación entre dos fuentes distintas: UI del player vs servicio de configuración.
  expect(reproduced).to eq(@default_channel_id),
                        "Canal reproducido (#{reproduced}) distinto del canal default (#{@default_channel_id})"
end
