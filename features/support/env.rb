# frozen_string_literal: true

# ---------------------------------------------------------------------------
# Soporte Cucumber para la corrida QA-CP001 / QA-CP078 / QA-CP131.
#
# Plataforma detectada a partir de los insumos (QA-3078 FIRETV, QA-5576 ADTV,
# QA-5587 FTV, QA-3077 ADT/FTV) => Fire TV / Android TV = Android.
# Driver: Appium con automationName UiAutomator2. NO se incluye Selenium como
# driver principal ni capabilities/artefactos de iOS o Web.
#
# Toda URL, capability, app path, server, token o dato de prueba proviene de
# variables de entorno. Nada se inventa: la configuración faltante se marca como
# pendiente (Cucumber pending) de forma controlada, nunca con raise/fail.
# ---------------------------------------------------------------------------

require 'rspec/expectations'
require 'appium_lib'

# Registrar los matchers de RSpec en el World de Cucumber (expect disponible).
World(RSpec::Matchers)

# Cucumber no carga automáticamente features/pages: se requieren explícitamente.
require_relative 'test_config'
require_relative 'api_client'
require_relative 'driver_factory'
require_relative '../pages/base_page'
require_relative '../pages/tv_en_vivo_page'
require_relative '../pages/audio_subtitle_panel_page'
require_relative '../pages/epg_pin_page'

# Helpers compartidos por todos los step definitions de esta corrida.
module CvWorld
  # Marca el escenario como pendiente (no ejecutable) si falta configuración real.
  # Se invoca ANTES de cualquier validación funcional (regla de precondiciones).
  def require_config!(*keys)
    missing = TestConfig.missing(*keys)
    return if missing.empty?

    pending("Configuración pendiente (TODO): definir variables de entorno #{missing.join(', ')}")
  end

  # Garantiza que la sesión Appium Android está configurada antes de usar el driver.
  def ensure_appium!
    require_config!(*DriverFactory::REQUIRED)
  end

  def driver
    DriverFactory.driver
  end

  # Page Objects memoizados por escenario.
  def page(klass)
    @pages ||= {}
    @pages[klass] ||= klass.new(driver)
  end

  # Verificación REAL de sesión iniciada mediante una señal propia de sesión:
  # un elemento exclusivo del usuario autenticado (perfil autenticado).
  # No se usa el player ni la pantalla destino como sustituto de esta validación.
  # Llave de locator esperada: LOC_AUTH_PROFILE (accessibility id).
  def ensure_authenticated_session!
    ensure_appium!
    require_config!('LOC_AUTH_PROFILE')

    ready = page(BasePage).present?(:accessibility_id, TestConfig['LOC_AUTH_PROFILE'])
    expect(ready).to be(true),
                     'No se pudo verificar la sesión autenticada (perfil de usuario ausente)'
  end
end

World(CvWorld)

# Cierre de la sesión Appium al finalizar cada escenario (si llegó a abrirse).
After do
  DriverFactory.quit
end
