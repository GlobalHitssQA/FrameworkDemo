# frozen_string_literal: true

# Page Object del Catalogo de la app de TV.
#
# Locators moviles: SOLO accessibility id / id / locators reales provistos por los insumos.
# Los insumos de los casos TC001/TC003/TC005 NO proveen accessibility ids ni resource-ids,
# por lo que quedan como TODO y deben resolverse con los locators reales de la app de TV.
class CatalogoTvPage
  def initialize(driver)
    @driver = driver
  end

  # TODO: reemplazar por el accessibility id / resource-id real del evento en vivo CON derecho.
  LIVE_EVENT_WITH_RIGHTS_ACCESSIBILITY_ID = ENV['CATALOGO_EVENTO_CON_DERECHO_ACC_ID']
  # TODO: reemplazar por el accessibility id / resource-id real del evento en vivo SIN derecho.
  LIVE_EVENT_WITHOUT_RIGHTS_ACCESSIBILITY_ID = ENV['CATALOGO_EVENTO_SIN_DERECHO_ACC_ID']

  def seleccionar_evento_con_derecho
    accessibility_id_required!(LIVE_EVENT_WITH_RIGHTS_ACCESSIBILITY_ID,
                              'CATALOGO_EVENTO_CON_DERECHO_ACC_ID')
    @driver.find_element(:accessibility_id, LIVE_EVENT_WITH_RIGHTS_ACCESSIBILITY_ID).click
  end

  def seleccionar_evento_sin_derecho
    accessibility_id_required!(LIVE_EVENT_WITHOUT_RIGHTS_ACCESSIBILITY_ID,
                              'CATALOGO_EVENTO_SIN_DERECHO_ACC_ID')
    @driver.find_element(:accessibility_id, LIVE_EVENT_WITHOUT_RIGHTS_ACCESSIBILITY_ID).click
  end

  # El foco en TV se refleja como estado seleccionado/focused del elemento.
  def evento_con_foco?
    accessibility_id_required!(LIVE_EVENT_WITH_RIGHTS_ACCESSIBILITY_ID,
                              'CATALOGO_EVENTO_CON_DERECHO_ACC_ID')
    el = @driver.find_element(:accessibility_id, LIVE_EVENT_WITH_RIGHTS_ACCESSIBILITY_ID)
    el.attribute('focused') == 'true' || el.attribute('selected') == 'true'
  end

  def evento_restringido_seleccionado?
    accessibility_id_required!(LIVE_EVENT_WITHOUT_RIGHTS_ACCESSIBILITY_ID,
                              'CATALOGO_EVENTO_SIN_DERECHO_ACC_ID')
    el = @driver.find_element(:accessibility_id, LIVE_EVENT_WITHOUT_RIGHTS_ACCESSIBILITY_ID)
    el.attribute('focused') == 'true' || el.attribute('selected') == 'true'
  end

  private

  def accessibility_id_required!(value, env_name)
    return unless value.nil? || value.to_s.strip.empty?

    raise "TODO: locator pendiente. Defina #{env_name} con el accessibility id/resource-id " \
          'real del catalogo de la app de TV (no se permite inventar selectores).'
  end
end
