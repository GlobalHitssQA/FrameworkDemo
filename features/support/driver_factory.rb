# frozen_string_literal: true

require 'appium_lib'

# Fábrica del driver Appium para plataforma Android con automationName UiAutomator2.
# Plataforma detectada a partir de los insumos (QA-3078 FIRETV, QA-5576 ADTV,
# QA-5587 FTV, QA-3077 ADT/FTV): Fire TV / Android TV => Android + UiAutomator2.
#
# Todas las capabilities y la URL del server provienen de variables de entorno.
# No se definen valores ficticios: si falta configuración, DriverFactory.missing
# lista las llaves pendientes y el step marca el escenario como pending.
module DriverFactory
  # Capabilities mínimas requeridas para levantar la sesión Android real.
  REQUIRED = %w[
    APPIUM_SERVER_URL
    ANDROID_DEVICE_NAME
    ANDROID_PLATFORM_VERSION
    APP_PACKAGE
    APP_ACTIVITY
  ].freeze

  module_function

  def configured?
    TestConfig.present?(*REQUIRED)
  end

  def missing
    TestConfig.missing(*REQUIRED)
  end

  # Devuelve la sesión activa, creándola una sola vez por escenario.
  # Solo debe invocarse cuando configured? == true (el step lo garantiza).
  def driver
    @driver ||= start!
  end

  def start!
    caps = {
      platformName: 'Android',
      'appium:automationName' => 'UiAutomator2',
      'appium:deviceName' => TestConfig['ANDROID_DEVICE_NAME'],
      'appium:platformVersion' => TestConfig['ANDROID_PLATFORM_VERSION'],
      'appium:appPackage' => TestConfig['APP_PACKAGE'],
      'appium:appActivity' => TestConfig['APP_ACTIVITY'],
      # noReset conserva la sesión ya autenticada del dispositivo de pruebas.
      'appium:noReset' => true
    }
    # app (ruta al APK) es opcional: solo si el entorno la provee.
    caps['appium:app'] = TestConfig['APP_PATH'] if TestConfig['APP_PATH']

    options = {
      caps: caps,
      appium_lib: { server_url: TestConfig['APPIUM_SERVER_URL'] }
    }
    Appium::Driver.new(options, false).start_driver
  end

  def quit
    @driver&.quit
  rescue StandardError
    # El cierre de la sesión no debe enmascarar el resultado del escenario.
    nil
  ensure
    @driver = nil
  end
end
