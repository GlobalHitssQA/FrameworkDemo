# frozen_string_literal: true

# Step definitions para el feature existente features/RegistroDeCita.feature.
# Se agregan para que la validación `cucumber --dry-run` no reporte pasos
# indefinidos. La implementación real queda pendiente (TODO) ya que el flujo
# original estaba definido en el stack previo (CodeceptJS/TS).

Given('Im logged in') do
  pending('Implementar autologin real para el flujo de Registro de citas')
end

Given('Im logged in as {string}') do |_perfil|
  pending('Implementar autologin por perfil para el flujo de Registro de citas')
end

Given('I select the contact') do
  pending('Implementar selección de contacto')
end

Given('I should create the appointment with {word} , {word} , {word} , {word} , {word} , {word}') do |_name, _surname, _phone, _email, _date, _time|
  pending('Implementar creación de cita con los datos provistos')
end

When('I download pdf') do
  pending('Implementar descarga de PDF')
end

Then('I validate pdf') do
  pending('Implementar validación de PDF')
end
