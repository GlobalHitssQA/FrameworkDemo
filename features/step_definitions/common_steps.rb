# encoding: utf-8
#
# Pasos comunes (precondiciones y contexto) reutilizados por TC004, TC007 y TC011.

Given('el usuario esta autenticado en la app iOS de Claro Drive') do
  # TODO: Implementar el flujo real de autenticacion / autologin en la app iOS.
  # Se apoya en el driver configurado en features/support/env.rb.
  expect(@driver).not_to be_nil
end

Given('la app esta actualizada con la optimizacion de CDIS-10000') do
  # Precondicion de entorno: build con la optimizacion CDIS-10000 instalada.
  # TODO: Validar la version/build de la app contra el valor esperado.
end

Given('la cuenta de prueba tiene un volumen conocido de imagenes indexadas') do
  # El volumen esperado se provee por variable de entorno (5K, 10K, 15K+).
  @expected_total = ENV['EXPECTED_IMAGE_COUNT']
  # TODO: Confirmar que la cuenta de prueba tiene el volumen esperado configurado.
end

Given('se dispone de acceso al backend/API para consultar el total reportado') do
  expect(@backend).not_to be_nil
end

Given('la cuenta de prueba tiene mas de 10000 imagenes indexadas en orden cronologico') do
  # TODO: Confirmar el volumen (+10,000) y el orden cronologico de la cuenta de prueba.
end

Given('el dispositivo cuenta con conexion estable a la red') do
  # Precondicion de entorno: conectividad de red estable.
  # TODO: Validar la conectividad del dispositivo/simulador si aplica.
end

Given('la cuenta de prueba tiene imagenes indexadas en la Galeria') do
  # TODO: Confirmar que la cuenta de prueba tiene imagenes indexadas disponibles.
end
