# frozen_string_literal: true

# Guía de programación (EPG) en TV en vivo.
# Los locators móviles reales deben proveerse por entorno (no se inventan selectores):
#   EPG_GUIDE_ROOT             -> contenedor visible de la EPG abierta
#   EPG_LOCKED_EVENT           -> evento de un canal bloqueado
#   EPG_LOCKED_EVENT_SECONDARY -> segundo evento del mismo canal bloqueado
# Formato de cada variable: "estrategia=valor" (p.ej. "accessibility_id=epg_grid")
class EpgPage < BasePage
  GUIDE_ROOT = 'EPG_GUIDE_ROOT'
  LOCKED_EVENT = 'EPG_LOCKED_EVENT'
  SECONDARY_LOCKED_EVENT = 'EPG_LOCKED_EVENT_SECONDARY'

  REQUIRED_TO_OPEN = [GUIDE_ROOT].freeze
  REQUIRED_TO_SELECT = [LOCKED_EVENT].freeze
  REQUIRED_SECONDARY = [SECONDARY_LOCKED_EVENT].freeze

  def open?
    visible?(ClaroVideo::Config.locator(GUIDE_ROOT))
  end

  def select_locked_event
    tap(ClaroVideo::Config.locator(LOCKED_EVENT))
  end

  def select_secondary_locked_event
    tap(ClaroVideo::Config.locator(SECONDARY_LOCKED_EVENT))
  end
end
