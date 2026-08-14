# frozen_string_literal: true

# Soporte de Cucumber para la automatización de Claro Drive (iOS).
# Carga librerías, expectativas RSpec y Page Objects, y configura el driver
# de Selenium WebDriver mediante variables de entorno (sin credenciales hardcodeadas).

require 'cucumber'
require 'selenium-webdriver'
require 'rspec/expectations'
require 'page-object'

# Carga de Page Objects y clientes de soporte.
Dir[File.join(__dir__, '..', 'pages', '*.rb')].sort.each { |file| require file }

World(RSpec::Matchers)

# Construye el driver de Selenium según la configuración del entorno.
# Variables soportadas:
#   BROWSER            -> :chrome (default), :firefox (para el runner de UI web)
#   SELENIUM_REMOTE_URL-> URL de un Selenium Grid / Appium remoto (opcional)
#   IMPLICIT_WAIT      -> timeout implícito en segundos (default 10)
#   HEADLESS           -> 'true' para ejecutar sin interfaz
def build_driver
  remote_url = ENV['SELENIUM_REMOTE_URL']
  browser = ENV.fetch('BROWSER', 'chrome').to_sym

  driver =
    if remote_url && !remote_url.empty?
      # TODO: definir SELENIUM_REMOTE_URL apuntando al grid/Appium real del entorno.
      Selenium::WebDriver.for(:remote, url: remote_url, capabilities: browser)
    else
      options = build_options(browser)
      Selenium::WebDriver.for(browser, options: options)
    end

  driver.manage.timeouts.implicit_wait = ENV.fetch('IMPLICIT_WAIT', '10').to_i
  driver
end

def build_options(browser)
  case browser
  when :firefox
    options = Selenium::WebDriver::Firefox::Options.new
    options.add_argument('--headless') if ENV['HEADLESS'] == 'true'
    options
  else
    options = Selenium::WebDriver::Chrome::Options.new
    options.add_argument('--headless=new') if ENV['HEADLESS'] == 'true'
    options.add_argument('--no-sandbox')
    options
  end
end

Before do
  @driver = build_driver
  @gallery = GalleryPage.new(@driver)
  @api_client = BackendApiClient.new
end

After do
  @driver&.quit
end
