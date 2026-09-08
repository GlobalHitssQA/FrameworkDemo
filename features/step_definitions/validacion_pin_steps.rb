# frozen_string_literal: true

# Steps para la validación de PIN en eventos de canales bloqueados desde la EPG.
# Casos: QC-CP001 (PIN correcto), QC-CP002 (PIN incorrecto), QC-CP003 (persistencia de desbloqueo).
# Plataforma: Android (Appium + UiAutomator2).

# ------------------------------------------------------------------------------
# Precondiciones (Given) — se establecen y verifican realmente antes del When.
# ------------------------------------------------------------------------------

Given('el usuario está autenticado en TV en vivo') do
  # Señal de sesión real: validez del user_token frente al servicio autenticado.
  verify_authenticated_session!
end

Given('el canal seleccionado está bloqueado') do
  # channels_check == true (booleano estricto) para el mismo usuario y canal del escenario.
  verify_channel_locked!
end

Given('el usuario tiene un PIN de seguridad configurado') do
  # Dato real desde entorno; se valida disponibilidad y longitud (4 a 6 caracteres).
  configured_pin
end

Given('la guía de programación EPG está abierta') do
  config_or_pending!(*EpgPage::REQUIRED_TO_OPEN)
  expect(epg_page.open?).to(be(true), 'La guía de programación (EPG) no está abierta')
end

Given('el canal actual fue desbloqueado previamente con el PIN correcto') do
  # Establece realmente el estado "canal desbloqueado" ejecutando el flujo de PIN correcto.
  verify_channel_locked!
  config_or_pending!(
    *EpgPage::REQUIRED_TO_SELECT,
    *PinPage::REQUIRED_SCREEN,
    *PinPage::REQUIRED_INPUT,
    *PinPage::REQUIRED_CONFIRM
  )

  epg_page.select_locked_event
  expect(pin_page.displayed?).to(be(true), 'No se desplegó la pantalla de PIN para desbloquear el canal')

  pin_page.enter_pin(configured_pin)
  pin_page.confirm

  # Desbloqueo efectivo: la pantalla de PIN se cierra tras la validación correcta.
  expect(pin_page.closed?).to(be(true), 'El canal no quedó desbloqueado; la pantalla de PIN sigue visible')
  @channel_unlocked = true
end

# ------------------------------------------------------------------------------
# Acciones (When)
# ------------------------------------------------------------------------------

When('selecciona un evento de un canal bloqueado desde la EPG') do
  config_or_pending!(*EpgPage::REQUIRED_TO_SELECT)
  epg_page.select_locked_event
end

When('ingresa el PIN de seguridad correcto configurado') do
  config_or_pending!(*PinPage::REQUIRED_INPUT)
  pin_page.enter_pin(configured_pin)
end

When('ingresa un PIN de seguridad incorrecto') do
  config_or_pending!(*PinPage::REQUIRED_INPUT)
  pin_page.enter_pin(invalid_pin)
end

When('confirma el ingreso del PIN de seguridad') do
  config_or_pending!(*PinPage::REQUIRED_CONFIRM)
  pin_page.confirm
end

When('ejecuta una acción sobre un evento del mismo canal desbloqueado') do
  config_or_pending!(*ProgramOptionsPage::REQUIRED)
  options_page.open_more_options
end

When('ejecuta una segunda acción sobre otro evento del mismo canal desbloqueado') do
  config_or_pending!(*EpgPage::REQUIRED_SECONDARY, *ProgramOptionsPage::REQUIRED)
  epg_page.select_secondary_locked_event
  options_page.open_more_options
end

# ------------------------------------------------------------------------------
# Verificaciones (Then)
# ------------------------------------------------------------------------------

Then('el sistema despliega la pantalla de ingreso de PIN de seguridad') do
  config_or_pending!(*PinPage::REQUIRED_SCREEN)
  expect(pin_page.displayed?).to(be(true), 'No se desplegó la pantalla de PIN de seguridad')
end

Then('el servicio de validación responde que el PIN es válido') do
  # Corrobora is_valid == true contra el servicio para el mismo usuario y canal.
  verify_pin_service_valid!(configured_pin)
end

Then('el usuario accede y visualiza el evento del canal bloqueado sin volver a solicitar el PIN') do
  config_or_pending!(*EventPlaybackPage::REQUIRED_WITH_IDENTITY)
  # Señal positiva: el evento se reproduce.
  expect(event_page.playing?).to(be(true), 'El evento del canal bloqueado no se está visualizando')
  # Identidad del evento: debe corresponder al evento esperado del escenario.
  expect(event_page.current_title).to eq(expected_event_title)
  # Tras la señal positiva, se verifica que el PIN no se vuelve a solicitar.
  expect(pin_page.closed?).to(be(true), 'La pantalla de PIN se volvió a solicitar tras el acceso')
end

Then('el sistema muestra el tooltip de error {string}') do |mensaje|
  config_or_pending!(*PinPage::REQUIRED_ERROR)
  expect(pin_page.error_visible?).to(be(true), 'No se mostró el tooltip de error de PIN')
  expect(pin_page.error_text.strip).to eq(mensaje)
end

Then('la pantalla de PIN permanece visible y no se concede acceso al evento') do
  config_or_pending!(*PinPage::REQUIRED_SCREEN, *EventPlaybackPage::REQUIRED_PLAYER)
  expect(pin_page.displayed?).to(be(true), 'La pantalla de PIN no permanece visible')
  # Acceso NO concedido: el reproductor del evento permanece ausente durante un intervalo acotado.
  expect(event_page.player_remains_absent?).to(be(true), 'Se concedió acceso al evento con un PIN incorrecto')
end

Then('la pantalla de PIN permite reintentar el ingreso del PIN de seguridad') do
  config_or_pending!(*PinPage::REQUIRED_INPUT)
  expect(pin_page.input_available?).to(be(true), 'La pantalla de PIN no permite reintentar el ingreso del PIN')
end

Then('el evento del canal se visualiza sin la pantalla de PIN activa') do
  config_or_pending!(*EventPlaybackPage::REQUIRED_PLAYER, *PinPage::REQUIRED_SCREEN)
  expect(event_page.playing?).to(be(true), 'El evento del canal desbloqueado no se visualiza')
  expect(pin_page.closed?).to(be(true), 'La pantalla de PIN permanece activa en el canal desbloqueado')
end

Then('la acción se ejecuta sin desplegar la pantalla de ingreso de PIN') do
  config_or_pending!(*ProgramOptionsPage::REQUIRED_PANEL, *PinPage::REQUIRED_SCREEN)
  # Señal positiva: la acción abrió el panel de opciones.
  expect(options_page.panel_visible?).to(be(true), 'La acción no se ejecutó; el panel de opciones no es visible')
  # Tras la señal positiva, se verifica que no se re-solicitó el PIN.
  expect(pin_page.closed?).to(be(true), 'Se volvió a solicitar el PIN en el mismo canal desbloqueado')
end

Then('la acción se ejecuta sin volver a solicitar el PIN de seguridad') do
  config_or_pending!(*ProgramOptionsPage::REQUIRED_PANEL, *PinPage::REQUIRED_SCREEN)
  expect(options_page.panel_visible?).to(be(true), 'La segunda acción no se ejecutó; el panel de opciones no es visible')
  expect(pin_page.closed?).to(be(true), 'Se volvió a solicitar el PIN en el mismo canal desbloqueado')
end

Then('el canal se mantiene desbloqueado y no se re-solicita el PIN mientras el usuario permanece en el canal') do
  config_or_pending!(*PinPage::REQUIRED_SCREEN)
  expect(@channel_unlocked).to(be(true), 'El canal no fue desbloqueado en la sesión actual')
  expect(pin_page.closed?).to(be(true), 'El PIN se re-solicitó mientras el usuario permanece en el canal')
end
