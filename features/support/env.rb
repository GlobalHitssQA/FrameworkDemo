# frozen_string_literal: true

# Soporte Cucumber para la automatizacion del Panel de Metadata en el Player de TV.
#
# Plataforma detectada a partir de los casos (app de TV / Player de TV, navegacion por
# foco y control OK/Play): app NATIVA de TV automatizada con Appium.
# Driver: Appium con automationName = UiAutomator2 (Android TV).
#
# IMPORTANTE: No se incluyen valores ficticios. Toda capability, ruta de app, URL de
# servidor Appium, URL/token del backend de metadata y credenciales deben provenir de
# variables de entorno. Las que falten quedan marcadas como TODO/configuracion pendiente.

require 'appium_lib'
require 'rspec/expectations'

module MetadataTvConfig
  module_function

  # URL del servidor Appium. TODO: definir APPIUM_SERVER_URL en el entorno de ejecucion.
  def appium_server_url
    ENV['APPIUM_SERVER_URL'] # TODO: configuracion pendiente (ej. exportar APPIUM_SERVER_URL)
  end

  # Capabilities para Android TV con UiAutomator2.
  # Todos los valores provienen del entorno; sin defaults ficticios.
  def caps
    {
      caps: {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        # TODO: exportar APP_PLATFORM_VERSION con la version de Android TV objetivo.
        platformVersion: ENV['APP_PLATFORM_VERSION'],
        # TODO: exportar APP_DEVICE_NAME con el nombre/serial del dispositivo o emulador de TV.
        deviceName: ENV['APP_DEVICE_NAME'],
        # TODO: exportar APP_UDID con el identificador del dispositivo de TV.
        udid: ENV['APP_UDID'],
        # TODO: exportar APP_PACKAGE / APP_ACTIVITY o APP_PATH del build de la app de TV.
        appPackage: ENV['APP_PACKAGE'],
        appActivity: ENV['APP_ACTIVITY'],
        app: ENV['APP_PATH'],
        autoGrantPermissions: true
      }.reject { |_k, v| v.nil? || v.to_s.strip.empty? },
      appium_lib: {
        server_url: appium_server_url,
        wait: (ENV['APPIUM_DEFAULT_WAIT'] || '20').to_i
      }
    }
  end

  # Datos del backend de metadata (usado por TC005). Sin valores ficticios.
  def backend_metadata_base_url
    ENV['METADATA_BACKEND_URL'] # TODO: configuracion pendiente (URL del servicio de metadata)
  end

  def backend_auth_token
    ENV['METADATA_BACKEND_TOKEN'] # TODO: configuracion pendiente (token de acceso al backend)
  end
end

Before do
  @driver = Appium::Driver.new(MetadataTvConfig.caps, true)
  @driver.start_driver
  Appium.promote_appium_methods(Object) if respond_to?(:promote_appium_methods)
end

After do
  @driver&.quit_driver
end
