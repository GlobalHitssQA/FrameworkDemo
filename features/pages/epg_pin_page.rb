# frozen_string_literal: true

require_relative 'base_page'

# QA-CP131 — Page Object de la EPG y la pantalla de PIN de seguridad
# (Android / Appium UiAutomator2).
#
# Locators y datos del evento desde variables de entorno (no inventados).
#
# Llaves de locator esperadas:
#   LOC_EPG_BLOCKED_EVENT   -> accessibility id del evento de canal bloqueado a abrir (regla: mismo event_id)
#   LOC_EVENT_PLAY_OPTION   -> accessibility id de la opción "Reproducir" del evento
#   LOC_EVENT_ID_FIELD      -> accessibility id del elemento que expone el id del evento abierto
#   LOC_PIN_SCREEN          -> accessibility id de la pantalla de ingreso de PIN
#   LOC_PLAYER_SURFACE      -> accessibility id de la superficie del reproductor (debe permanecer ausente)
class EpgPinPage < BasePage
  LOCATOR_KEYS = %w[
    LOC_EPG_BLOCKED_EVENT
    LOC_EVENT_PLAY_OPTION
    LOC_EVENT_ID_FIELD
    LOC_PIN_SCREEN
    LOC_PLAYER_SURFACE
  ].freeze

  def open_blocked_event
    event = require_element(:accessibility_id, TestConfig['LOC_EPG_BLOCKED_EVENT'],
                            'evento de canal bloqueado en la EPG')
    event.click
  end

  # Verifica que el evento abierto corresponde exactamente al event_id esperado.
  def opened_event_id
    element = require_element(:accessibility_id, TestConfig['LOC_EVENT_ID_FIELD'],
                              'identificador del evento abierto')
    value = element.attribute('content-desc')
    value = element.text if value.nil? || value.strip.empty?
    value&.strip
  end

  def choose_play
    option = require_element(:accessibility_id, TestConfig['LOC_EVENT_PLAY_OPTION'],
                             'opción "Reproducir" del evento')
    option.click
  end

  def pin_screen_visible?
    present?(:accessibility_id, TestConfig['LOC_PIN_SCREEN'])
  end

  # El reproductor NO debe iniciar mientras no se valide el PIN.
  def player_absent?
    absent_after_settled?(:accessibility_id, TestConfig['LOC_PLAYER_SURFACE'])
  end
end
