# frozen_string_literal: true

# Soporte Cucumber para automatización de la aplicación de TV.
# Plataforma detectada a partir de los casos: aplicación nativa de TV -> Android TV.
# Driver obligatorio: Appium con automationName UiAutomator2.
#
# Todas las capabilities, rutas de app, URL del servidor y credenciales faltantes provienen
# de variables de entorno y quedan marcadas como TODO / configuración pendiente.
# No se usan valores ficticios.

require 'appium_lib'
require 'rspec/expectations'

# Carga de Page Objects.
require_relative '../pages/player_tv_page'

# Capabilities de Appium para Android (UiAutomator2).
# TODO: proveer estos valores reales mediante variables de entorno antes de la ejecución real.
def appium_caps
  {
    caps: {
      platformName: ENV['ANDROID_PLATFORM_NAME'] || 'Android',
      # TODO: automationName obligatorio para Android.
      automationName: ENV['ANDROID_AUTOMATION_NAME'] || 'UiAutomator2',
      platformVersion: ENV['ANDROID_PLATFORM_VERSION'],   # TODO
      deviceName: ENV['ANDROID_DEVICE_NAME'],             # TODO
      # TODO: ruta al APK de la app de TV o app/appPackage+appActivity.
      app: ENV['ANDROID_APP_PATH'],                       # TODO
      appPackage: ENV['ANDROID_APP_PACKAGE'],             # TODO
      appActivity: ENV['ANDROID_APP_ACTIVITY']            # TODO
    },
    appium_lib: {
      # TODO: URL del Appium server (p.ej. http://127.0.0.1:4723).
      server_url: ENV['APPIUM_SERVER_URL']                # TODO
    }
  }
end

# Contenedor de estado compartido entre steps.
class TvWorld
  attr_accessor :driver, :player_tv_page, :metadata_snapshots

  def initialize
    @metadata_snapshots = {}
  end
end

World { TvWorld.new }

Before do
  @driver = Appium::Driver.new(appium_caps, true).start_driver
  Appium.promote_appium_methods(Object) if defined?(Appium.promote_appium_methods)
  @player_tv_page = PlayerTvPage.new(@driver)
end

After do
  @driver&.quit_driver
rescue StandardError
  # Se ignora el cierre si el driver no llegó a iniciarse (configuración pendiente).
end
