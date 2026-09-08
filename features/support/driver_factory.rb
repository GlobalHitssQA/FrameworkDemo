# frozen_string_literal: true

module ClaroVideo
  # Construcción del driver Appium con UiAutomator2 (plataforma Android: Android TV / Fire TV).
  # Todas las capabilities provienen de variables de entorno; no hay valores ficticios.
  module DriverFactory
    module_function

    def build
      caps = {
        platformName: 'Android',
        'appium:automationName' => 'UiAutomator2',
        'appium:deviceName' => Config.fetch('ANDROID_DEVICE_NAME'),
        'appium:appPackage' => Config.fetch('ANDROID_APP_PACKAGE'),
        'appium:appActivity' => Config.fetch('ANDROID_APP_ACTIVITY'),
        'appium:noReset' => true
      }

      udid = Config.fetch('ANDROID_UDID')
      caps['appium:udid'] = udid if udid

      app_path = Config.fetch('ANDROID_APP_PATH')
      caps['appium:app'] = app_path if app_path

      platform_version = Config.fetch('ANDROID_PLATFORM_VERSION')
      caps['appium:platformVersion'] = platform_version if platform_version

      options = {
        caps: caps,
        appium_lib: { server_url: Config.fetch('APPIUM_SERVER_URL') }
      }

      driver = Appium::Driver.new(options, false)
      driver.start_driver
    end
  end
end
