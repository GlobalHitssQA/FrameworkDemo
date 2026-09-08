# frozen_string_literal: true

# Page Object base para automatización Android (Appium + UiAutomator2).
# Provee esperas explícitas y acotadas; nunca usa sleeps fijos como sincronización.
# Las esperas de ausencia se realizan tras una señal positiva y con intervalo estable.
class BasePage
  DEFAULT_TIMEOUT = Integer(ENV.fetch('APPIUM_WAIT_TIMEOUT', '20'))
  ABSENCE_STABLE_SECONDS = Integer(ENV.fetch('APPIUM_ABSENCE_STABLE_SECONDS', '5'))
  POLL_INTERVAL = 0.5

  def initialize(driver)
    @driver = driver
  end

  # Espera explícita a que el elemento sea visible; devuelve el elemento.
  def wait_visible(locator, timeout: DEFAULT_TIMEOUT)
    strategy, value = locator
    waiter(timeout).until do
      element = @driver.find_element(strategy, value)
      element if element.displayed?
    end
  end

  # true si el elemento se vuelve visible dentro del timeout; false si expira.
  def visible?(locator, timeout: DEFAULT_TIMEOUT)
    !wait_visible(locator, timeout: timeout).nil?
  rescue Selenium::WebDriver::Error::TimeoutError
    false
  end

  def read_text(locator, timeout: DEFAULT_TIMEOUT)
    wait_visible(locator, timeout: timeout).text
  end

  def tap(locator, timeout: DEFAULT_TIMEOUT)
    wait_visible(locator, timeout: timeout).click
  end

  def type_text(locator, text, timeout: DEFAULT_TIMEOUT)
    element = wait_visible(locator, timeout: timeout)
    element.clear
    element.send_keys(text)
  end

  # Verifica que un elemento permanezca ausente durante un intervalo acotado.
  # Debe invocarse tras confirmar una señal positiva del sistema.
  def remains_absent?(locator, stable_seconds: ABSENCE_STABLE_SECONDS)
    deadline = monotonic + stable_seconds
    while monotonic < deadline
      return false if present_now?(locator)

      sleep POLL_INTERVAL
    end
    true
  end

  private

  # Consulta puntual de presencia. Sólo la ausencia real del elemento cuenta como
  # "no presente"; cualquier otro error del driver se propaga (no se enmascara).
  def present_now?(locator)
    strategy, value = locator
    @driver.find_element(strategy, value).displayed?
  rescue Selenium::WebDriver::Error::NoSuchElementError,
         Selenium::WebDriver::Error::StaleElementReferenceError
    false
  end

  def waiter(timeout)
    Selenium::WebDriver::Wait.new(
      timeout: timeout,
      interval: POLL_INTERVAL,
      ignore: [
        Selenium::WebDriver::Error::NoSuchElementError,
        Selenium::WebDriver::Error::StaleElementReferenceError
      ]
    )
  end

  def monotonic
    Process.clock_gettime(Process::CLOCK_MONOTONIC)
  end
end
