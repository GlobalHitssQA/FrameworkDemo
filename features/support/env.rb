# frozen_string_literal: true

require 'rspec/expectations'

# Plataforma declarada en los insumos: App TV ClaroVideo (Android TV / Fire TV) => Android.
# Driver: Appium con UiAutomator2. No se carga Selenium como driver principal.
require 'appium_lib'

# Soporte
require_relative 'config'
require_relative 'api_client'
require_relative 'driver_factory'
require_relative 'cucumber_world'

# Page Objects generados para esta corrida (QC-CP001 / QC-CP002 / QC-CP003).
# Cucumber no carga automáticamente los archivos ubicados en features/pages,
# por lo que se requieren explícitamente aquí.
require_relative '../pages/base_page'
require_relative '../pages/epg_page'
require_relative '../pages/pin_page'
require_relative '../pages/event_playback_page'
require_relative '../pages/program_options_page'

# RSpec::Matchers disponible en el World (permite usar expect(...).to ...).
World(RSpec::Matchers)
# Helpers de negocio/infraestructura.
World(ClaroVideo::CucumberWorld)

# Cierre de la sesión Appium al finalizar cada escenario, si llegó a iniciarse.
After do
  driver = @appium_driver
  next unless driver

  begin
    driver.quit
  rescue StandardError
    # El cierre del driver no debe enmascarar el resultado del escenario.
  ensure
    @appium_driver = nil
  end
end
