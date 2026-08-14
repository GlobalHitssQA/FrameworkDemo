# encoding: utf-8
#
# Configuracion de soporte para Cucumber + Selenium WebDriver + RSpec.
# No contiene credenciales hardcodeadas: el driver y los endpoints se
# configuran mediante variables de entorno.
#
# Variables de entorno soportadas:
#   SELENIUM_BROWSER    : navegador/driver a usar (ej. chrome, firefox, safari). Default: chrome
#   SELENIUM_REMOTE_URL : URL del Selenium/Appium remoto (opcional). Si no se define, se usa driver local.
#   BACKEND_API_BASE_URL, BACKEND_API_TOKEN, TEST_ACCOUNT_ID : ver BackendApiClient

require 'cucumber'
require 'selenium-webdriver'
require 'rspec/expectations'

# Carga de Page Objects y clientes de soporte.
Dir[File.join(File.dirname(__FILE__), '..', 'pages', '*.rb')].sort.each { |f| require File.expand_path(f) }

World(RSpec::Matchers)

# Crea el driver de Selenium en funcion de variables de entorno.
def build_driver
  browser = (ENV['SELENIUM_BROWSER'] || 'chrome').to_sym
  remote_url = ENV['SELENIUM_REMOTE_URL']

  if remote_url && !remote_url.empty?
    Selenium::WebDriver.for(:remote, url: remote_url, capabilities: browser)
  else
    Selenium::WebDriver.for(browser)
  end
end

Before do
  @driver = build_driver
  @gallery_page = GalleryPage.new(@driver)
  @backend = BackendApiClient.new
end

After do
  @driver.quit if @driver
end
