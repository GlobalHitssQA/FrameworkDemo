# frozen_string_literal: true

# Page Object del Player de TV y su panel de Metadata (plataforma Android TV - Appium/UiAutomator2).
#
# IMPORTANTE: Los casos de prueba NO proporcionan locators reales (accessibility id / id).
# Por lo tanto, cada locator queda marcado como TODO y debe resolverse desde variables de
# entorno (configuración pendiente). No se inventan valores.
#
# Convención de locators en móvil: accessibility id, id u otros locators reales.
# Rellenar mediante ENV al integrar con el AUT.
class PlayerTvPage
  def initialize(driver)
    @driver = driver
  end

  # --- Locators (TODO: proveer valores reales vía ENV; no inventar) ---
  # Elemento del player en reproducción.
  def player_view
    find(ENV['PLAYER_TV_VIEW_ID']) # TODO: definir PLAYER_TV_VIEW_ID (accessibility id / id real)
  end

  # Panel de metadata (nuevo diseño).
  def metadata_panel
    find(ENV['PLAYER_TV_METADATA_PANEL_ID']) # TODO: definir PLAYER_TV_METADATA_PANEL_ID
  end

  # Acción/botón de reproducción.
  def play_action
    find(ENV['PLAYER_TV_PLAY_ACTION_ID']) # TODO: definir PLAYER_TV_PLAY_ACTION_ID
  end

  # Mensaje/comportamiento de falta de derecho de reproducción.
  def no_rights_indicator
    find(ENV['PLAYER_TV_NO_RIGHTS_ID']) # TODO: definir PLAYER_TV_NO_RIGHTS_ID
  end

  # --- Acciones ---

  # Accede a un evento en vivo desde un punto de entrada dado (Home, Grilla, Buscador, etc.).
  # El identificador del contenedor de cada punto de entrada debe proveerse por ENV.
  def open_live_event_from(entry_point)
    env_key = "PLAYER_TV_ENTRY_POINT_#{normalize(entry_point)}_ID"
    container = find(ENV[env_key]) # TODO: definir #{env_key} para el punto de entrada real
    container.click
  end

  def select_non_live_event
    find(ENV['PLAYER_TV_NON_LIVE_EVENT_ID']).click # TODO: definir PLAYER_TV_NON_LIVE_EVENT_ID
  end

  def select_live_event_without_rights
    find(ENV['PLAYER_TV_LIVE_EVENT_NO_RIGHTS_ID']).click # TODO: definir PLAYER_TV_LIVE_EVENT_NO_RIGHTS_ID
  end

  def play
    play_action.click
  end

  def go_back
    @driver.back
  end

  # --- Verificaciones ---
  def playing?
    displayed?(player_view)
  end

  def metadata_panel_visible?
    displayed?(metadata_panel)
  end

  def non_live_event_highlighted_and_playable?
    displayed?(find(ENV['PLAYER_TV_NON_LIVE_EVENT_ID'])) && displayed?(play_action)
  end

  def live_event_highlighted?
    displayed?(find(ENV['PLAYER_TV_LIVE_EVENT_NO_RIGHTS_ID']))
  end

  def no_rights_behavior_shown?
    displayed?(no_rights_indicator)
  end

  # Snapshot textual del panel de metadata para comparar entre puntos de entrada.
  def metadata_snapshot
    metadata_panel.text
  end

  private

  def normalize(text)
    text.to_s.strip.upcase.gsub(/[^A-Z0-9]+/, '_')
  end

  def find(selector)
    raise 'Locator no configurado (TODO): defina la variable de entorno correspondiente' if selector.nil? || selector.empty?

    # Android TV / UiAutomator2: se resuelve por accessibility id.
    @driver.find_element(:accessibility_id, selector)
  end

  def displayed?(element)
    element.displayed?
  rescue StandardError
    false
  end
end
