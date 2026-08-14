# frozen_string_literal: true

require_relative '../pages/galeria_page'
require_relative '../pages/preview_page'

# Steps de Background compartidos por las features de Galería (Claro Drive iOS).
# Se definen una sola vez para evitar definiciones ambiguas o duplicadas.

Given('la app Claro Drive iOS está instalada y actualizada con la optimización de CDIS-10000') do
  # Precondición de entorno: build con la optimización CDIS-10000 instalada.
  # El driver iOS se inicializa en features/support/env.rb (Appium + XCUITest).
  expect($driver).not_to be_nil
end

Given('se cuenta con conectividad estable') do
  # Precondición de red estable; validada a nivel de entorno de ejecución.
  # TODO: integrar verificación de conectividad si se dispone de endpoint de salud.
end
