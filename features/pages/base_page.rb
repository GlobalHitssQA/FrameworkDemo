# frozen_string_literal: true

require 'selenium-webdriver'

# Page Object base para la automatización Android (Appium + UiAutomator2).
#
# Provee esperas explícitas y acotadas. Regla clave de robustez:
# los helpers de presencia/ausencia SOLO tratan como "ausente" la excepción
# específica NoSuchElementError (envuelta por TimeoutError al agotar la espera).
# Errores de sesión, transporte, comando inválido o driver caído se propagan.
class BasePage
  DEFAULT_TIMEOUT = TestConfig.int('WAIT_TIMEOUT', 20)
  # Intervalo durante el que un estado NO deseado debe permanecer ausente
  # tras confirmar una señal positiva (validaciones negativas).
  ABSENCE_HOLD = TestConfig.int('ABSENCE_HOLD_TIMEOUT', 3)

  def initialize(driver)
    @driver = driver
  end

  # Espera explícita a que el elemento esté presente; devuelve el elemento.
  def wait_present(how, value, timeout: DEFAULT_TIMEOUT)
    waiter(timeout).until { @driver.find_element(how, value) }
  end

  # Espera explícita a que el elemento esté presente y visible; devuelve el elemento.
  def wait_visible(how, value, timeout: DEFAULT_TIMEOUT)
    waiter(timeout).until do
      el = @driver.find_element(how, value)
      el.displayed? ? el : nil
    end
  end

  # true si el elemento aparece dentro del timeout; false si no aparece.
  # Solo la ausencia real (NoSuchElement -> Timeout) se convierte en false.
  def present?(how, value, timeout: DEFAULT_TIMEOUT)
    wait_present(how, value, timeout: timeout)
    true
  rescue Selenium::WebDriver::Error::TimeoutError
    false
  end

  # Espera una señal positiva y luego verifica que el estado NO deseado
  # permanezca ausente durante un intervalo acotado (validaciones negativas).
  def absent_after_settled?(how, value, hold: ABSENCE_HOLD)
    deadline = monotonic_now + hold
    while monotonic_now < deadline
      return false if quick_exists?(how, value)

      sleep 0.3
    end
    true
  end

  # Devuelve el elemento ya disponible o marca fallo descriptivo (no NoMethodError).
  def require_element(how, value, description, timeout: DEFAULT_TIMEOUT)
    wait_visible(how, value, timeout: timeout)
  rescue Selenium::WebDriver::Error::TimeoutError
    raise "No se encontró el elemento requerido: #{description} (#{how}=#{value})"
  end

  private

  def waiter(timeout)
    Selenium::WebDriver::Wait.new(
      timeout: timeout,
      interval: 0.5,
      ignore: [Selenium::WebDriver::Error::NoSuchElementError]
    )
  end

  # Existencia puntual sin espera: solo NoSuchElement cuenta como "no existe".
  def quick_exists?(how, value)
    @driver.find_element(how, value)
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  def monotonic_now
    Process.clock_gettime(Process::CLOCK_MONOTONIC)
  end
end
