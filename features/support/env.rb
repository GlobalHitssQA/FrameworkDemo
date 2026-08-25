# frozen_string_literal: true

# Soporte Cucumber para automatizacion movil de la app nativa "Player de TV".
# Plataforma detectada desde los casos (aplicacion de TV / player de TV): Android TV.
# Driver: Appium con automationName UiAutomator2.
#
# IMPORTANTE:
# Toda capability, ruta de app, URL de servidor o credencial debe provenir de
# variables de entorno. Los valores faltantes quedan marcados como TODO /
# configuracion pendiente. No se definen valores ficticios.

require 'rspec/expectations'

begin
  require 'appium_lib'
rescue LoadError
  # En dry-run (cucumber --dry-run) los steps no se ejecutan, por lo que la gem
  # puede no estar instalada. Se evita romper la carga del entorno.
  warn 'appium_lib no disponible: se omite la inicializacion del driver (modo dry-run).'
end

# Capabilities de Appium para Android TV / UiAutomator2.
# TODO: definir estas variables de entorno en el ambiente de ejecucion real.
def appium_caps
  {
    caps: {
      platformName: 'Android',
      automationName: 'UiAutomator2',
      # TODO: version de Android TV del dispositivo/emulador destino.
      platformVersion: ENV['ANDROID_PLATFORM_VERSION'],
      # TODO: nombre del dispositivo/emulador de Android TV.
      deviceName: ENV['ANDROID_DEVICE_NAME'],
      # TODO: ruta absoluta al APK del Player de TV (o appPackage/appActivity).
      app: ENV['TV_APP_PATH'],
      appPackage: ENV['TV_APP_PACKAGE'],
      appActivity: ENV['TV_APP_ACTIVITY']
    },
    appium_lib: {
      # TODO: URL del servidor Appium (ej. http://127.0.0.1:4723/wd/hub).
      server_url: ENV['APPIUM_SERVER_URL']
    }
  }
end

module DriverHelper
  def driver
    $appium_driver
  end
end
World(DriverHelper)

Before do
  if defined?(Appium)
    $appium_driver ||= Appium::Driver.new(appium_caps, true)
    $appium_driver.start_driver
    Appium.promote_appium_methods(Object) if $appium_driver
  end
end

After do
  $appium_driver&.driver_quit
  $appium_driver = nil
end
