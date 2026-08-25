# Page Object para QA-CP005: manejo de respuestas del backend de metadata.
# Los casos NO proporcionan locators reales ni endpoints. Se toman de variables
# de entorno y se marcan como TODO (configuración pendiente). No se inventan
# selectores, URLs ni credenciales.
class PanelMetadataBackendPage
  def initialize(driver)
    @driver = driver
  end

  # Simula la respuesta del backend de metadata (parcial / vacía / error).
  # tipo: :campos_incompletos | :payload_vacio | :error_http
  def simular_respuesta_backend(tipo)
    # TODO: integrar el mecanismo real de mocking del backend de metadata
    # (endpoint / proxy / stub) mediante variables de entorno.
    endpoint = ENV['METADATA_BACKEND_MOCK_URL']
    raise 'TODO: configurar METADATA_BACKEND_MOCK_URL' if endpoint.to_s.empty?
    # TODO: implementar la simulación real de la respuesta "#{tipo}" contra #{endpoint}.
    raise "TODO: implementar simulación de respuesta '#{tipo}' del backend de metadata"
  end

  def player_estable?
    # TODO: definir el accessibility id / id real del contenedor base del player.
    locator = ENV['PLAYER_TV_CONTENEDOR_BASE_ID']
    raise 'TODO: configurar PLAYER_TV_CONTENEDOR_BASE_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  def reproduccion_activa?
    # TODO: definir el accessibility id / id real del indicador de reproducción activa.
    locator = ENV['PLAYER_TV_REPRODUCCION_ACTIVA_ID']
    raise 'TODO: configurar PLAYER_TV_REPRODUCCION_ACTIVA_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  def panel_metadata_desplegado?
    # TODO: definir el accessibility id / id real del panel de metadata.
    locator = ENV['PLAYER_TV_PANEL_METADATA_ID']
    raise 'TODO: configurar PLAYER_TV_PANEL_METADATA_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any?(&:displayed?)
  end

  # Indica si se muestran valores nulos crudos en el panel (no deseado).
  def muestra_valores_nulos_crudos?
    # TODO: definir el accessibility id / id real de los campos del panel de metadata.
    locator = ENV['PLAYER_TV_PANEL_METADATA_CAMPO_ID']
    raise 'TODO: configurar PLAYER_TV_PANEL_METADATA_CAMPO_ID' if locator.to_s.empty?
    @driver.find_elements(:accessibility_id, locator).any? do |campo|
      %w[null nil NaN undefined].include?(campo.text.to_s.strip)
    end
  end

  # Indica si el panel despliega datos inválidos ante un error del backend.
  def muestra_datos_invalidos?
    muestra_valores_nulos_crudos?
  end
end
