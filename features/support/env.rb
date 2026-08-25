# frozen_string_literal: true

# Soporte Cucumber para la corrida de automatizacion del Panel de Metadata del
# Player de TV (IDs: QC-CP001, QC-CP002, QA-CP003).
#
# Plataforma detectada: Android (aplicacion de TV nativa).
# Driver: Appium con automationName UiAutomator2.
#
# Toda capability, app path, server url, credencial, locator o dato faltante
# proviene EXCLUSIVAMENTE de variables de entorno y queda pendiente (TODO) si no
# se proporciona. No se usan valores ficticios.

require 'rspec/expectations'
require 'appium_lib'

# Registrar los matchers de RSpec en el World de Cucumber (necesario para expect).
World(RSpec::Matchers)

# Page Objects generados para esta corrida (Cucumber NO carga automaticamente
# los archivos ubicados en features/pages, por lo que se requieren explicitamente).
require_relative '../pages/base_page'
require_relative '../pages/session_page'
require_relative '../pages/tv_player_page'
require_relative '../pages/metadata_panel_page'

# ---------------------------------------------------------------------------
# Configuracion del driver Appium (Android / UiAutomator2)
# ---------------------------------------------------------------------------
module TvDriver
  # Capabilities/servidor MINIMOS requeridos para poder levantar el driver real.
  # TODO: proveer estos valores por entorno (sin ellos los escenarios quedan
  # marcados como pendientes/no ejecutables de forma controlada).
  REQUIRED_ENV = %w[
    APPIUM_SERVER_URL
    TV_APP_PATH
    ANDROID_DEVICE_NAME
    ANDROID_PLATFORM_VERSION
  ].freeze

  module_function

  def present?(value)
    !value.nil? && !value.to_s.strip.empty?
  end

  def missing_env
    REQUIRED_ENV.reject { |key| present?(ENV[key]) }
  end

  def config_ready?
    missing_env.empty?
  end

  def start
    return @driver if @driver

    caps = {
      platformName: 'Android',
      'appium:automationName' => 'UiAutomator2',
      'appium:app' => ENV['TV_APP_PATH'],
      'appium:deviceName' => ENV['ANDROID_DEVICE_NAME'],
      'appium:platformVersion' => ENV['ANDROID_PLATFORM_VERSION']
    }
    # Capabilities opcionales solo si fueron provistas (no se inventan).
    caps['appium:appPackage'] = ENV['ANDROID_APP_PACKAGE'] if present?(ENV['ANDROID_APP_PACKAGE'])
    caps['appium:appActivity'] = ENV['ANDROID_APP_ACTIVITY'] if present?(ENV['ANDROID_APP_ACTIVITY'])
    caps['appium:udid'] = ENV['ANDROID_UDID'] if present?(ENV['ANDROID_UDID'])

    @driver = Appium::Driver.new(
      {
        caps: caps,
        appium_lib: { server_url: ENV['APPIUM_SERVER_URL'] }
      },
      true
    )
    @driver.start_driver
    @driver
  end

  def session
    @driver&.driver
  end

  def quit
    @driver&.quit_driver
  ensure
    @driver = nil
  end
end

# ---------------------------------------------------------------------------
# Helpers disponibles en cada escenario (World de Cucumber)
# ---------------------------------------------------------------------------
module TvWorld
  # Sesion Selenium/Appium usada por los Page Objects.
  def tv_session
    TvDriver.session
  end

  # Guarda de configuracion/insumos. Recibe un hash { 'CLAVE' => valor }.
  # Si algun valor requerido falta, marca el step como PENDIENTE de forma
  # controlada (nunca con raise/fail incondicional).
  def require_inputs!(inputs)
    missing = inputs.select { |_k, v| v.nil? || v.to_s.strip.empty? }.keys
    return if missing.empty?

    pending(
      'Configuracion/insumo pendiente (no ejecutable hasta proveer valores reales por ' \
      "entorno): #{missing.join(', ')}."
    )
  end

  # Garantiza que el driver este activo. Si las capabilities no estan completas,
  # marca el step como pendiente de forma controlada.
  def ensure_driver!
    unless TvDriver.config_ready?
      pending(
        'Driver Appium (Android/UiAutomator2) no configurado. Faltan capabilities: ' \
        "#{TvDriver.missing_env.join(', ')}."
      )
      return
    end
    TvDriver.start
  end

  # Almacenamiento compartido por escenario (para baseline dentro de un mismo
  # escenario). Se reinicia en cada escenario via hook Before.
  def scenario_store
    $tv_scenario_store ||= {}
  end
end

World(TvWorld)

# ---------------------------------------------------------------------------
# Hooks de ciclo de vida
# ---------------------------------------------------------------------------
Before do
  # Estado por-escenario limpio (baseline se maneja dentro de un unico escenario).
  $tv_scenario_store = {}
end

After do
  TvDriver.quit
end
