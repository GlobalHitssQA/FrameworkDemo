# Page Object para QA-CP002: control de derecho de reproducción en el Player de TV.
# Los casos NO proporcionan locators reales. Se toman de variables de entorno y
# se marcan como TODO (configuración pendiente). No se inventan selectores.
class PlayerTvDerechoPage
  def initialize(driver)
    @driver = driver
  end

  # Selecciona un evento en vivo sobre el que el usuario no tiene derecho.
  def seleccionar_evento_sin_derecho
    # TODO: definir el accessibility id / id real del evento en vivo.
    locator = ENV['PLAYER_TV_EVENTO_VIVO_SIN_DERECHO_ID']
    raise 'TODO: configurar PLAYER_TV_EVENTO_VIVO_SIN_DERECHO_ID' if locator.to_s.empty?
    @driver.find_element(:accessibility_id, locator).click
  end

  # Indica si la reproducción del evento se inició.
  def reproduccion_iniciada?
    # TODO: definir el accessibility id / id real del indicador de reproducción activa.
    locator = ENV['PLAYER_TV_REPRODUCCION_ACTIVA_ID']
    raise 'TODO: configurar PLAYER_TV_REPRODUCCION_ACTIVA_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  # Indica si el panel de metadata está desplegado.
  def panel_metadata_desplegado?
    # TODO: definir el accessibility id / id real del panel de metadata.
    locator = ENV['PLAYER_TV_PANEL_METADATA_ID']
    raise 'TODO: configurar PLAYER_TV_PANEL_METADATA_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  # Indica si se muestra el mensaje/estado estándar de acceso denegado.
  def acceso_denegado_mostrado?
    # TODO: definir el accessibility id / id real del mensaje de acceso denegado.
    locator = ENV['PLAYER_TV_ACCESO_DENEGADO_ID']
    raise 'TODO: configurar PLAYER_TV_ACCESO_DENEGADO_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  # Indica si el Player de TV se mantiene estable (contenedor base presente).
  def player_estable?
    # TODO: definir el accessibility id / id real del contenedor base del player.
    locator = ENV['PLAYER_TV_CONTENEDOR_BASE_ID']
    raise 'TODO: configurar PLAYER_TV_CONTENEDOR_BASE_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end
end
