# Page Object del Panel de Metadata del Player de TV
# Casos de esta corrida: QA-CP002, QA-CP003, QC-CP001
#
# IMPORTANTE (rule 9): la plataforma (Web/Android/iOS) NO está declarada en los insumos.
# Los locators reales del panel no fueron provistos y no se inventan. Los steps marcan el
# escenario como pending de forma controlada antes de instanciar este Page Object.
#
# El driver esperado es el adaptador de la plataforma que se declare (Selenium/Appium) que
# exponga la interfaz usada por estos métodos.
class MetadataPanelPage
  # TODO: locators reales pendientes de insumos + plataforma declarada.
  LOCATORS = {
    panel_container: nil, # TODO: locator del contenedor del panel de metadata
    field_by_key: nil     # TODO: estrategia/locator para leer un campo por su llave
  }.freeze

  DEFAULT_TIMEOUT = 15

  def initialize(driver)
    @driver = driver
  end

  def open
    @driver.open_metadata_panel(LOCATORS[:panel_container])
  end

  def wait_until_visible(timeout = DEFAULT_TIMEOUT)
    wait_for(timeout) { visible? }
  end

  def visible?
    element = @driver.find_or_nil(LOCATORS[:panel_container])
    !element.nil? && @driver.visible?(element)
  end

  # Validación negativa acotada (rule 18): confirma que el panel permanece ausente
  # durante el intervalo indicado tras haberse resuelto el acceso.
  def remains_absent?(hold_seconds)
    deadline = monotonic_now + hold_seconds
    loop do
      return false if visible?
      return true if monotonic_now >= deadline
      @driver.poll_interval
    end
  end

  # Lee los valores renderizados de los campos indicados desde la UI realmente
  # mostrada (rule 32), leyendo cada campo por su llave desde el árbol renderizado.
  def field_values(keys)
    keys.each_with_object({}) do |key, acc|
      acc[key] = @driver.field_text(LOCATORS[:field_by_key], key)
    end
  end

  def field_truncated?(key)
    @driver.field_truncated?(LOCATORS[:field_by_key], key)
  end

  private

  def wait_for(timeout)
    deadline = monotonic_now + timeout
    loop do
      return true if yield
      return false if monotonic_now >= deadline
      @driver.poll_interval
    end
  end

  def monotonic_now
    Process.clock_gettime(Process::CLOCK_MONOTONIC)
  end
end
