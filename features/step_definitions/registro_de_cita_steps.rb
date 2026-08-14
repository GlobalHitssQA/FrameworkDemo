# encoding: utf-8
#
# Definiciones de pasos para la feature existente features/RegistroDeCita.feature.
# Se agregan de forma aditiva (sin modificar la feature) para que la validacion
# `cucumber --dry-run` no reporte pasos indefinidos.
# Los cuerpos quedan marcados con TODO por no contar con los locators reales.

Given('Im logged in') do
  # TODO: Implementar el flujo de autologin real.
  pending 'Autologin no implementado (feature heredada)'
end

Given('Im logged in as {string}') do |perfil|
  # TODO: Implementar el autologin para el perfil indicado (ej. "Banca Privada", "Banca Patrimonial").
  pending "Autologin como #{perfil} no implementado (feature heredada)"
end

Given('I select the contact') do
  # TODO: Implementar la seleccion de contacto.
  pending 'Seleccion de contacto no implementada (feature heredada)'
end

Given('I should create the appointment with {string} , {string} , {string} , {string} , {string} , {string}') do |name, surname, phone, email, date, time|
  # TODO: Implementar la creacion de la cita con los datos provistos.
  pending 'Creacion de cita no implementada (feature heredada)'
end

When('I download pdf') do
  # TODO: Implementar la descarga del PDF.
  pending 'Descarga de PDF no implementada (feature heredada)'
end

Then('I validate pdf') do
  # TODO: Implementar la validacion del PDF descargado.
  pending 'Validacion de PDF no implementada (feature heredada)'
end
