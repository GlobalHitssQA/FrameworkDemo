# frozen_string_literal: true

# Page Object del panel de metadata en el player de TV (QA-CP001).
#
# La plataforma de UI (Web / Android / iOS) NO está declarada explícitamente en
# los insumos: la aplicación se describe como "Player de TV (Claro Video TV)".
# Por regla, no se infiere plataforma a partir de "TV"/"Player" ni se elige un
# driver por defecto. Este Page Object, por lo tanto:
#   - NO fija un driver concreto (Selenium/Appium) ni capabilities;
#   - NO inventa selectores/locators.
#
# Los locators reales del player y del panel deben provenir de los insumos
# (Figma) y de la plataforma declarada, e inyectarse junto con el driver real
# cuando la configuración de plataforma esté disponible.
class MetadataPanelPlayerPage
  # Locators reales PENDIENTES de definición (no se inventan selectores).
  LOCATORS = {
    player_view: nil,      # TODO: locator real de la vista del player de TV
    metadata_panel: nil,   # TODO: locator real del panel de metadata
    metadata_fields: nil,  # TODO: locator real de los campos (llaves) de metadata
    playback_state: nil    # TODO: señal/locator real del estado de reproducción activa
  }.freeze

  def initialize(driver = nil)
    @driver = driver
  end

  # Indica si el Page Object cuenta con driver real y locators reales para
  # poder operar sobre la UI de la plataforma declarada.
  def ready?
    !@driver.nil? && LOCATORS.values.all? { |locator| !locator.nil? }
  end
end
