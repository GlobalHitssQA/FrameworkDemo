# frozen_string_literal: true

# Pantalla de ingreso de PIN de seguridad (control parental).
# Locators móviles reales por entorno (no se inventan selectores):
#   PIN_SCREEN_TITLE   -> título/contenedor de la pantalla de PIN
#   PIN_INPUT_FIELD    -> campo de captura del PIN
#   PIN_CONFIRM_BUTTON -> botón/acción de confirmación del PIN
#   PIN_ERROR_TOOLTIP  -> tooltip de error de PIN
class PinPage < BasePage
  SCREEN_TITLE = 'PIN_SCREEN_TITLE'
  INPUT_FIELD = 'PIN_INPUT_FIELD'
  CONFIRM_BUTTON = 'PIN_CONFIRM_BUTTON'
  ERROR_TOOLTIP = 'PIN_ERROR_TOOLTIP'

  REQUIRED_SCREEN = [SCREEN_TITLE].freeze
  REQUIRED_INPUT = [INPUT_FIELD].freeze
  REQUIRED_CONFIRM = [CONFIRM_BUTTON].freeze
  REQUIRED_ERROR = [ERROR_TOOLTIP].freeze

  def displayed?
    visible?(ClaroVideo::Config.locator(SCREEN_TITLE))
  end

  def enter_pin(pin)
    type_text(ClaroVideo::Config.locator(INPUT_FIELD), pin)
  end

  def confirm
    tap(ClaroVideo::Config.locator(CONFIRM_BUTTON))
  end

  def error_visible?
    visible?(ClaroVideo::Config.locator(ERROR_TOOLTIP))
  end

  def error_text
    read_text(ClaroVideo::Config.locator(ERROR_TOOLTIP))
  end

  def input_available?
    visible?(ClaroVideo::Config.locator(INPUT_FIELD))
  end

  # Verifica de forma acotada que la pantalla de PIN dejó de mostrarse / no se re-solicita.
  def closed?
    remains_absent?(ClaroVideo::Config.locator(SCREEN_TITLE))
  end
end
