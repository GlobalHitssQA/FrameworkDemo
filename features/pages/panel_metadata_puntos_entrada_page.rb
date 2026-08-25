# Page Object para QC-CP002: acceso al panel de metadata desde cada punto de entrada.
# Los casos NO enumeran los puntos de entrada concretos ni proporcionan locators
# reales. Se toman de variables de entorno y se marcan como TODO. No se inventan
# selectores.
class PanelMetadataPuntosEntradaPage
  def initialize(driver)
    @driver = driver
  end

  # Accede al evento en vivo desde el punto de entrada indicado.
  def acceder_desde_punto_de_entrada(punto)
    # TODO: mapear cada punto de entrada listado a su accessibility id / id real.
    # Ej.: ENV['PUNTO_ENTRADA_1_ID'], ENV['PUNTO_ENTRADA_2_ID'], ...
    clave = "PUNTO_ENTRADA_#{punto.upcase.gsub(/[^A-Z0-9]+/, '_')}_ID"
    locator = ENV[clave]
    raise "TODO: configurar #{clave} con el accessibility id real del punto de entrada '#{punto}'" if locator.to_s.empty?
    @driver.find_element(:accessibility_id, locator).click
  end

  def player_abierto?
    # TODO: definir el accessibility id / id real del contenedor base del player.
    locator = ENV['PLAYER_TV_CONTENEDOR_BASE_ID']
    raise 'TODO: configurar PLAYER_TV_CONTENEDOR_BASE_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  def panel_metadata_visible?
    # TODO: definir el accessibility id / id real del panel de metadata.
    locator = ENV['PLAYER_TV_PANEL_METADATA_ID']
    raise 'TODO: configurar PLAYER_TV_PANEL_METADATA_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  # Devuelve una huella (estructura/datos) del panel para comparar entre puntos.
  def huella_panel_metadata
    # TODO: definir el accessibility id / id real de los campos del panel de metadata.
    locator = ENV['PLAYER_TV_PANEL_METADATA_CAMPO_ID']
    raise 'TODO: configurar PLAYER_TV_PANEL_METADATA_CAMPO_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).map { |c| c.text.to_s.strip }
  end
end
