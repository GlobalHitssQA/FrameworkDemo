# frozen_string_literal: true

# ---------------------------------------------------------------------------
# Soporte de ejecución para Claro Drive iOS
# Plataforma detectada a partir de los casos: iOS  ->  Appium + XCUITest
#
# TODAS las capabilities, rutas de app, URL del servidor Appium y credenciales
# provienen EXCLUSIVAMENTE de variables de entorno. No se incluyen valores
# ficticios: lo que falte queda marcado como TODO / configuración pendiente.
# ---------------------------------------------------------------------------

require 'appium_lib'
require 'rspec/expectations'

World(RSpec::Matchers)

module ClaroDriveiOS
  # URL del servidor Appium (TODO: definir APPIUM_SERVER_URL en el entorno)
  def self.appium_server_url
    ENV['APPIUM_SERVER_URL'] # TODO: configurar, p.ej. http://127.0.0.1:4723
  end

  # Capabilities iOS / XCUITest. Cada valor debe provenir del entorno.
  # TODO: configurar cada variable de entorno antes de la ejecución real.
  def self.capabilities
    {
      'platformName'    => 'iOS',
      'appium:automationName' => 'XCUITest',
      'appium:platformVersion' => ENV['IOS_PLATFORM_VERSION'], # TODO: versión de iOS del dispositivo/simulador
      'appium:deviceName'      => ENV['IOS_DEVICE_NAME'],      # TODO: nombre del dispositivo/simulador
      'appium:udid'            => ENV['IOS_UDID'],             # TODO: UDID para dispositivo físico (opcional en simulador)
      'appium:app'             => ENV['CLARO_DRIVE_IOS_APP'],  # TODO: ruta al .app/.ipa de Claro Drive iOS
      'appium:bundleId'        => ENV['CLARO_DRIVE_IOS_BUNDLE_ID'], # TODO: bundleId si se usa app preinstalada
      'appium:noReset'         => true
    }.reject { |_k, v| v.nil? }
  end

  def self.appium_options
    {
      caps: capabilities,
      appium_lib: {
        server_url: appium_server_url,
        wait: Integer(ENV.fetch('APPIUM_DEFAULT_WAIT', '30'))
      }
    }
  end
end

# El driver se inicia por escenario y se expone como $driver para step defs / page objects.
Before do
  if ClaroDriveiOS.appium_server_url.nil? || ClaroDriveiOS.capabilities['appium:app'].nil? && ClaroDriveiOS.capabilities['appium:bundleId'].nil?
    # TODO: configurar APPIUM_SERVER_URL y CLARO_DRIVE_IOS_APP/CLARO_DRIVE_IOS_BUNDLE_ID.
    # Durante --dry-run los steps no se ejecutan, por lo que la validación sintáctica no requiere driver.
  end

  $appium_driver = Appium::Driver.new(ClaroDriveiOS.appium_options, false)
  $driver = $appium_driver.start_driver
  Appium.promote_appium_methods(Object, $appium_driver) if $appium_driver
end

After do
  $appium_driver&.quit_driver
rescue StandardError
  # se ignora el cierre si el driver nunca inició (p.ej. configuración pendiente)
ensure
  $appium_driver = nil
  $driver = nil
end
