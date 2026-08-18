# frozen_string_literal: true

# Page Object del nuevo panel de Metadata dentro del Player de TV (diseno Figma Large Focus).
#
# Locators moviles: SOLO accessibility id / id / locators reales provistos por los insumos.
# Los insumos definen "titulo, descripcion y demas llaves definidas" pero NO entregan los
# accessibility ids concretos de cada campo, por lo que el mapeo de llaves queda como TODO
# y debe completarse con los locators reales de la app de TV (sin inventar selectores).
class PanelMetadataPage
  # TODO: reemplazar por el accessibility id / resource-id real del contenedor del panel de Metadata.
  PANEL_CONTAINER_ACCESSIBILITY_ID = ENV['PANEL_METADATA_CONTAINER_ACC_ID']

  # Mapa llave-de-metadata -> accessibility id del campo en el panel.
  # TODO: completar con los accessibility ids reales de cada llave definida en los insumos.
  # Ejemplo de origen esperado (variables de entorno), sin valores ficticios:
  #   PANEL_METADATA_TITULO_ACC_ID, PANEL_METADATA_DESCRIPCION_ACC_ID, ...
  FIELD_ACCESSIBILITY_IDS = {
    'titulo' => ENV['PANEL_METADATA_TITULO_ACC_ID'],
    'descripcion' => ENV['PANEL_METADATA_DESCRIPCION_ACC_ID']
    # TODO: agregar aqui las demas llaves de metadata definidas en los insumos con su accessibility id real.
  }.freeze

  def initialize(driver)
    @driver = driver
  end

  def desplegado?
    accessibility_id_required!(PANEL_CONTAINER_ACCESSIBILITY_ID, 'PANEL_METADATA_CONTAINER_ACC_ID')
    el = @driver.find_element(:accessibility_id, PANEL_CONTAINER_ACCESSIBILITY_ID)
    el.displayed?
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  # Devuelve el valor mostrado en el panel para una llave de metadata dada.
  def valor_campo(llave)
    acc_id = FIELD_ACCESSIBILITY_IDS[llave.to_s]
    if acc_id.nil? || acc_id.to_s.strip.empty?
      raise "TODO: locator pendiente para la llave '#{llave}'. Defina el accessibility id real " \
            'del campo en el panel de Metadata (no se permite inventar selectores).'
    end

    @driver.find_element(:accessibility_id, acc_id).text
  end

  # Devuelve un hash { llave => valor } con todos los campos configurados del panel.
  def valores
    FIELD_ACCESSIBILITY_IDS.keys.each_with_object({}) do |llave, acc|
      acc[llave] = valor_campo(llave)
    end
  end

  # Verdadero si todos los campos configurados estan poblados (no vacios).
  def campos_poblados?
    valores.values.all? { |v| !v.nil? && !v.to_s.strip.empty? }
  end

  private

  def accessibility_id_required!(value, env_name)
    return unless value.nil? || value.to_s.strip.empty?

    raise "TODO: locator pendiente. Defina #{env_name} con el accessibility id/resource-id " \
          'real del panel de Metadata (no se permite inventar selectores).'
  end
end
