# frozen_string_literal: true

# Lectura centralizada de configuración desde variables de entorno.
# No contiene valores ficticios: cualquier dato faltante se reporta como
# pendiente (TODO) para que el step correspondiente marque el escenario como
# no ejecutable de forma controlada (Cucumber pending), nunca con raise/fail.
module TestConfig
  module_function

  # Devuelve el valor de una variable de entorno o nil si está ausente/vacía.
  def [](key)
    value = ENV[key.to_s]
    return nil if value.nil?

    stripped = value.strip
    stripped.empty? ? nil : stripped
  end

  # true si TODAS las llaves están presentes con valor no vacío.
  def present?(*keys)
    keys.flatten.all? { |k| !self[k].nil? }
  end

  # Lista de llaves ausentes (para construir mensajes TODO claros).
  def missing(*keys)
    keys.flatten.reject { |k| self[k] }
  end

  # Entero con valor por defecto seguro para timeouts de espera explícita.
  def int(key, default)
    raw = self[key]
    raw ? Integer(raw) : default
  rescue ArgumentError
    default
  end
end
