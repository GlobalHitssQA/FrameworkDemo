# frozen_string_literal: true

require_relative 'base_page'

# MetadataPanelPage
#
# Encapsula el nuevo panel de metadata desplegado sobre el player de TV.
#
# Locators requeridos (accessibility id reales, provistos por entorno):
#   LOC_METADATA_PANEL_CONTAINER -> contenedor del panel de metadata
# Estructura del panel (provista por entorno; separada por comas). No se
# inventa la estructura: si no se provee, el descriptor no puede construirse y
# el step se marca como pendiente de definicion.
#   METADATA_FIELD_IDS   -> accessibility ids de los campos (titulo, descripcion, etc.)
#   METADATA_CONTROL_IDS -> accessibility ids de los controles del panel
class MetadataPanelPage < BasePage
  def container_locator
    self.class.locator('LOC_METADATA_PANEL_CONTAINER')
  end

  def field_ids
    parse_list('METADATA_FIELD_IDS')
  end

  def control_ids
    parse_list('METADATA_CONTROL_IDS')
  end

  # Estructura minima requerida para construir un descriptor comparable.
  def descriptor_definable?
    !container_locator.nil? && !field_ids.empty?
  end

  # Espera explicita a que el panel de metadata sea visible.
  def visible_panel?
    return nil if container_locator.nil?

    !wait_until_visible(container_locator).nil?
  end

  # Confirma, en intervalo acotado, que el panel permanece ausente (validacion
  # negativa; usar solo tras una senal positiva de proceso terminado).
  def panel_absent?
    return nil if container_locator.nil?

    remains_absent?(container_locator)
  end

  # Devuelve un descriptor estructural del panel para comparar consistencia
  # entre variantes/puntos de entrada: identidad de campos, textos, controles,
  # estados y orden. Requiere que el panel este visible.
  def descriptor
    return nil unless descriptor_definable?
    return nil if wait_until_visible(container_locator).nil?

    {
      fields: field_ids.map do |fid|
        el = find(fid)
        { id: fid, present: !el.nil?, text: el&.text, enabled: el.nil? ? nil : el.enabled? }
      end,
      controls: control_ids.map do |cid|
        el = find(cid)
        { id: cid, present: !el.nil?, enabled: el.nil? ? nil : el.enabled? }
      end,
      order: field_ids.dup
    }
  end

  # Metadata legible: al menos un campo definido esta presente con texto no vacio.
  def readable_metadata?
    return nil unless descriptor_definable?

    desc = descriptor
    return false if desc.nil?

    desc[:fields].any? { |f| f[:present] && f[:text] && !f[:text].strip.empty? }
  end

  private

  def parse_list(env_key)
    raw = ENV[env_key]
    return [] if raw.nil? || raw.strip.empty?

    raw.split(',').map(&:strip).reject(&:empty?)
  end
end
