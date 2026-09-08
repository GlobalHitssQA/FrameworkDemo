# frozen_string_literal: true

module ClaroVideo
  # Lectura centralizada de configuración desde variables de entorno.
  # No contiene valores por defecto ficticios: si un dato no está definido,
  # se reporta como faltante para que el step lo marque pendiente (TODO).
  module Config
    module_function

    # Devuelve el valor de la variable de entorno o nil si está ausente/vacía.
    def fetch(key)
      value = ENV[key]
      return nil if value.nil?

      value = value.strip
      value.empty? ? nil : value
    end

    # Devuelve la sublista de claves que no están configuradas.
    def missing(*keys)
      keys.flatten.reject { |key| fetch(key) }
    end

    # Convierte una variable de entorno "estrategia=valor" en un locator móvil real.
    # Estrategias soportadas (Appium/UiAutomator2): accessibility_id, id, xpath, class_name.
    # Sin prefijo se asume accessibility_id (locator móvil recomendado).
    # Devuelve nil si la variable no está definida (no se inventa selector).
    def locator(key)
      raw = fetch(key)
      return nil unless raw

      strategy, separator, value = raw.partition('=')
      if separator.empty?
        [:accessibility_id, strategy]
      else
        [strategy.strip.to_sym, value]
      end
    end
  end
end
