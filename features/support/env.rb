# frozen_string_literal: true

require 'rspec/expectations'

# Regla 10: registrar los matchers de RSpec en el World de Cucumber para que
# `expect(...)` esté disponible en todos los step definitions.
World(RSpec::Matchers)

# ---------------------------------------------------------------------------
# PLATAFORMA / DRIVER DE UI: PENDIENTE DE DETERMINACIÓN
#
# Aplicaciones declaradas en los casos de esta corrida:
#   - QA-CP001 / QA-CP004: "Player de TV (Claro Video TV)"
#   - QA-CP007:            "App Smart TV legada AAFCL (JS ES3)"
#
# Ninguno de los casos declara EXPLÍCITAMENTE una plataforma Web, Android o iOS.
# Por regla, no se infiere la plataforma a partir de "TV"/"Player"/"Smart TV"
# ni se elige un driver por defecto. En consecuencia:
#   - NO se cargan Selenium WebDriver ni Appium.
#   - NO se definen capabilities Android/iOS ni rutas de APK/IPA.
#   - La configuración de plataforma/driver de UI queda PENDIENTE hasta contar
#     con la plataforma declarada y sus locators reales.
#
# QA-CP007 es un caso de Integración de Servicios (HTTP) y se implementa de
# forma agnóstica a la plataforma usando la librería estándar de Ruby
# (Net::HTTP + JSON), sin requerir driver de UI.
# ---------------------------------------------------------------------------

module RunConfig
  # Devuelve el valor real de una variable de entorno, o nil si no está
  # definida o está vacía. No provee valores ficticios (regla 12).
  def env_value(name)
    raw = ENV[name]
    return nil if raw.nil? || raw.strip.empty?

    raw.strip
  end
end
World(RunConfig)

# Regla 10: Cucumber NO carga automáticamente los archivos de features/pages.
# Se requieren explícitamente TODOS los Page Objects generados en esta corrida.
require_relative '../pages/metadata_panel_player_page'
require_relative '../pages/metadata_backend_consistency_page'
require_relative '../pages/link_sessions_api_page'
