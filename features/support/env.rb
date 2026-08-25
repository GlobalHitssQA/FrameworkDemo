require 'appium_lib'
require 'rspec/expectations'

# ---------------------------------------------------------------------------
# Configuración del driver para la aplicación de TV (Android TV)
# Plataforma detectada desde los casos: "aplicación de TV / Player de TV".
# Driver: Appium con automationName = UiAutomator2 (Android).
#
# IMPORTANTE: Todas las capabilities, la URL del servidor Appium y las rutas de
# la aplicación deben provenir de variables de entorno. No se colocan valores
# ficticios. Configure estas variables antes de ejecutar (TODO: configuración
# pendiente en el entorno de ejecución / CI).
# ---------------------------------------------------------------------------

def appium_capabilities
  {
    caps: {
      platformName: 'Android',
      automationName: 'UiAutomator2',
      # TODO: definir en el entorno de ejecución
      deviceName: ENV['ANDROID_DEVICE_NAME'],
      platformVersion: ENV['ANDROID_PLATFORM_VERSION'],
      udid: ENV['ANDROID_UDID'],
      app: ENV['ANDROID_APP_PATH'],
      appPackage: ENV['ANDROID_APP_PACKAGE'],
      appActivity: ENV['ANDROID_APP_ACTIVITY']
    },
    appium_lib: {
      # TODO: definir la URL del servidor Appium en el entorno de ejecución
      server_url: ENV['APPIUM_SERVER_URL']
    }
  }
end

Before do
  @driver = Appium::Driver.new(appium_capabilities, true)
  @driver.start_driver
  Appium.promote_appium_methods(Object)
end

After do
  @driver&.quit_driver
end
