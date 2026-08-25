# frozen_string_literal: true

# Page Object del Player de TV (app nativa Android TV - Appium/UiAutomator2).
# Cubre unicamente los casos de esta corrida: QA-CP002, QA-CP004, QC-CP001.
#
# NOTA SOBRE LOCATORS:
# Los insumos de los casos no entregan accessibility id / id reales de los
# elementos. Por lo tanto TODOS los locators quedan como TODO / configuracion
# pendiente y deben completarse con los valores reales de la app antes de
# ejecutar (no se inventan selectores). Se ofrece la opcion de sobreescribirlos
# por variable de entorno para facilitar la parametrizacion.
class TvPlayerPage
  def initialize(driver)
    @driver = driver
  end

  # --- Locators (accessibility id / id reales pendientes de definir) ---

  # Evento no en vivo dentro de la grilla del player de TV.
  # TODO: reemplazar por el accessibility id / id real del item de grilla.
  def non_live_event_locator
    { accessibility_id: ENV['TV_NON_LIVE_EVENT_ACCESSIBILITY_ID'] } # TODO
  end

  # Evento en vivo con derecho de reproduccion dentro de la grilla.
  # TODO: reemplazar por el accessibility id / id real del item de grilla.
  def live_event_locator
    { accessibility_id: ENV['TV_LIVE_EVENT_ACCESSIBILITY_ID'] } # TODO
  end

  # Superficie del player durante la reproduccion.
  # TODO: reemplazar por el accessibility id / id real del player.
  def player_surface_locator
    { accessibility_id: ENV['TV_PLAYER_SURFACE_ACCESSIBILITY_ID'] } # TODO
  end

  # Contenedor del nuevo panel de metadata.
  # TODO: reemplazar por el accessibility id / id real del panel de metadata.
  def metadata_panel_locator
    { accessibility_id: ENV['TV_METADATA_PANEL_ACCESSIBILITY_ID'] } # TODO
  end

  # Puntos de entrada habilitados al panel de metadata.
  # TODO: reemplazar por los accessibility id / id reales de cada punto de entrada
  # listados en los insumos. Se deja como lista parametrizable por entorno.
  def metadata_entry_point_locators
    ids = (ENV['TV_METADATA_ENTRY_POINT_IDS'] || '').split(',').map(&:strip).reject(&:empty?)
    ids.map { |id| { accessibility_id: id } } # TODO
  end

  # Control para cerrar el panel de metadata.
  # TODO: reemplazar por el accessibility id / id real del control de cierre.
  def metadata_panel_close_locator
    { accessibility_id: ENV['TV_METADATA_PANEL_CLOSE_ACCESSIBILITY_ID'] } # TODO
  end

  # --- Acciones / Consultas ---

  def event_visible?(locator)
    element = find(locator)
    !element.nil? && element.displayed?
  end

  def select_event(locator)
    find(locator).click
  end

  def player_playing?
    element = find(player_surface_locator)
    !element.nil? && element.displayed?
  end

  def metadata_panel_displayed?
    element = find(metadata_panel_locator)
    !element.nil? && element.displayed?
  rescue StandardError
    false
  end

  def open_metadata_panel(locator)
    find(locator).click
  end

  def close_metadata_panel
    find(metadata_panel_close_locator).click
  end

  # Texto de metadata visible en el panel (titulo, datos del evento y llaves).
  def metadata_panel_text
    element = find(metadata_panel_locator)
    element.nil? ? '' : element.text.to_s
  end

  private

  # Busqueda por accessibility id (Appium/UiAutomator2).
  # Si el locator aun no esta definido (TODO), retorna nil para no fabricar valores.
  def find(locator)
    value = locator.is_a?(Hash) ? locator[:accessibility_id] : locator
    return nil if value.nil? || value.to_s.strip.empty?

    @driver.find_element(:accessibility_id, value)
  end
end
