# frozen_string_literal: true

# Visualización del evento del canal (reproducción tras validación de PIN).
# Locators móviles reales por entorno (no se inventan selectores):
#   EVENT_PLAYER -> componente de reproducción del evento
#   EVENT_TITLE  -> título del evento en reproducción (para verificar identidad del evento)
class EventPlaybackPage < BasePage
  PLAYER = 'EVENT_PLAYER'
  TITLE = 'EVENT_TITLE'

  REQUIRED_PLAYER = [PLAYER].freeze
  REQUIRED_WITH_IDENTITY = [PLAYER, TITLE].freeze

  def playing?
    visible?(ClaroVideo::Config.locator(PLAYER))
  end

  def current_title
    read_text(ClaroVideo::Config.locator(TITLE))
  end

  # Confirma de forma acotada que el evento NO se está reproduciendo (acceso no concedido).
  def player_remains_absent?
    remains_absent?(ClaroVideo::Config.locator(PLAYER))
  end
end
