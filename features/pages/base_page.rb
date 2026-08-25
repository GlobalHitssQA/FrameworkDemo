# frozen_string_literal: true

# BasePage
#
# Plataforma detectada para esta corrida: Android (Appium + UiAutomator2).
# Interaccion via la sesion Selenium/Appium (appium_driver.driver).
#
# Reglas aplicadas:
# - Solo se usan locators reales provistos por configuracion de entorno
#   (accessibility id / id). Ningun selector se inventa: si el locator no
#   fue provisto, el metodo lo reporta como ausente y el step lo marca como
#   pendiente/no ejecutable de forma controlada.
# - Todas las validaciones de estado usan esperas explicitas y acotadas.
#   No se usan sleeps fijos como sustituto de sincronizacion.
class BasePage
  DEFAULT_TIMEOUT = Integer(ENV.fetch('TV_WAIT_TIMEOUT_SECONDS', '15'))
  # Intervalo acotado para confirmar que un estado no deseado permanece ausente
  # (usado en validaciones negativas, luego de una senal positiva de proceso).
  NEGATIVE_STABILITY_SECONDS = Integer(ENV.fetch('TV_NEGATIVE_STABILITY_SECONDS', '3'))
  POLL_INTERVAL = Float(ENV.fetch('TV_POLL_INTERVAL_SECONDS', '0.3'))

  def initialize(session)
    # session = appium_driver.driver (Selenium::WebDriver session con bindings Appium)
    @session = session
  end

  # Devuelve el valor de un locator real provisto por entorno o nil si no existe.
  # No se genera ningun selector por defecto.
  def self.locator(env_key)
    value = ENV[env_key]
    value && !value.strip.empty? ? value : nil
  end

  # Espera explicita a que un elemento (por accessibility id) sea visible.
  # Devuelve el elemento o nil si no aparece dentro del timeout.
  def wait_until_visible(accessibility_id, timeout: DEFAULT_TIMEOUT)
    return nil if accessibility_id.nil?

    wait(timeout).until do
      element = find(accessibility_id)
      element && element.displayed? ? element : false
    end
  rescue ::Selenium::WebDriver::Error::TimeoutError
    nil
  end

  # Espera explicita a que un elemento deje de estar visible/presente.
  def wait_until_absent(accessibility_id, timeout: DEFAULT_TIMEOUT)
    return true if accessibility_id.nil?

    wait(timeout).until { !visible?(accessibility_id) }
    true
  rescue ::Selenium::WebDriver::Error::TimeoutError
    false
  end

  # Para validaciones negativas: confirma que el estado no deseado permanece
  # ausente durante un intervalo acotado. Debe llamarse DESPUES de haber
  # esperado una senal positiva de que el sistema termino de procesar.
  def remains_absent?(accessibility_id, interval: NEGATIVE_STABILITY_SECONDS)
    return true if accessibility_id.nil?

    deadline = monotonic_now + interval
    until monotonic_now >= deadline
      return false if visible?(accessibility_id)

      sleep(POLL_INTERVAL) # cadencia de sondeo, no sincronizacion por espera fija
    end
    !visible?(accessibility_id)
  end

  def visible?(accessibility_id)
    return false if accessibility_id.nil?

    element = find(accessibility_id)
    !element.nil? && element.displayed?
  rescue ::Selenium::WebDriver::Error::WebDriverError
    false
  end

  def text_of(accessibility_id)
    element = find(accessibility_id)
    element&.text
  end

  def find(accessibility_id)
    return nil if accessibility_id.nil?

    @session.find_element(:accessibility_id, accessibility_id)
  rescue ::Selenium::WebDriver::Error::NoSuchElementError
    nil
  end

  private

  def wait(timeout)
    ::Selenium::WebDriver::Wait.new(timeout: timeout, interval: POLL_INTERVAL)
  end

  def monotonic_now
    ::Process.clock_gettime(::Process::CLOCK_MONOTONIC)
  end
end
