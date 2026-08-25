# Page Object del Player de TV
# Casos de esta corrida: QA-CP002, QA-CP003, QC-CP001
#
# IMPORTANTE (rule 9): la plataforma (Web/Android/iOS) NO está declarada en los insumos
# de esta corrida. Mientras la plataforma no se declare y no se provean locators reales,
# el driver permanece pendiente y los steps marcan el escenario como pending de forma
# controlada ANTES de instanciar este Page Object. Por eso aquí no se inventan selectores.
#
# El driver esperado es un adaptador de la plataforma que se declare (Selenium para Web,
# Appium UiAutomator2 para Android, Appium XCUITest para iOS) y que exponga la interfaz
# usada por estos métodos (open_event, event_id_of, visible?, find_or_nil, poll_interval).
class PlayerTvPage
  # TODO: locators reales pendientes de insumos + plataforma declarada.
  # No se inventan selectores; las claves permanecen sin definir hasta ser provistas.
  LOCATORS = {
    player_container: nil, # TODO: locator del contenedor del player
    playback_active: nil,  # TODO: locator del indicador de reproducción activa
    access_denied: nil,    # TODO: locator/estado de acceso denegado
    player_error: nil,     # TODO: locator del estado de error del player
    event_id_attr: nil     # TODO: atributo/locator que expone el id del evento en curso
  }.freeze

  DEFAULT_TIMEOUT = 15

  def initialize(driver)
    @driver = driver
  end

  # Abre exactamente el evento indicado (rule 30): la navegación apunta al mismo
  # event_id validado en las precondiciones, no a un punto de entrada genérico.
  def open_event(event_id)
    @driver.open_event(event_id, LOCATORS[:player_container])
  end

  # Identidad del evento realmente mostrado en el player (rule 30).
  def current_event_id
    @driver.event_id_of(LOCATORS[:event_id_attr])
  end

  def wait_until_playing(timeout = DEFAULT_TIMEOUT)
    wait_for(timeout) { playing? }
  end

  def playing?
    element = @driver.find_or_nil(LOCATORS[:playback_active])
    !element.nil? && @driver.visible?(element)
  end

  # Señal positiva de que el intento de acceso terminó de procesarse (rule 18):
  # el player resolvió el acceso (denegado) en un estado observable.
  def wait_until_access_resolved(timeout = DEFAULT_TIMEOUT)
    wait_for(timeout) { access_resolved? }
  end

  def access_resolved?
    element = @driver.find_or_nil(LOCATORS[:access_denied])
    !element.nil? && @driver.visible?(element)
  end

  def error_state?
    element = @driver.find_or_nil(LOCATORS[:player_error])
    !element.nil? && @driver.visible?(element)
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
