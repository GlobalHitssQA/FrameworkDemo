# frozen_string_literal: true

# Pantalla "Opciones del Programa" (menú Más Opciones) sobre un evento.
# Locators móviles reales por entorno (no se inventan selectores):
#   PROGRAM_MORE_OPTIONS_BUTTON -> acción para abrir "Más Opciones"
#   PROGRAM_OPTIONS_PANEL       -> panel "Opciones del Programa" visible
class ProgramOptionsPage < BasePage
  MORE_OPTIONS_BUTTON = 'PROGRAM_MORE_OPTIONS_BUTTON'
  OPTIONS_PANEL = 'PROGRAM_OPTIONS_PANEL'

  REQUIRED = [MORE_OPTIONS_BUTTON, OPTIONS_PANEL].freeze
  REQUIRED_PANEL = [OPTIONS_PANEL].freeze

  def open_more_options
    tap(ClaroVideo::Config.locator(MORE_OPTIONS_BUTTON))
  end

  def panel_visible?
    visible?(ClaroVideo::Config.locator(OPTIONS_PANEL))
  end
end
