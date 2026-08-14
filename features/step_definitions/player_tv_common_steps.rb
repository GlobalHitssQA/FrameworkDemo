# frozen_string_literal: true

# Steps comunes del Player de TV compartidos por TC003, TC004 y TC005.
# No modificar para features históricas.

Given('el usuario está autenticado en la aplicación de TV') do
  # La sesión autenticada se establece mediante credenciales provistas por ENV.
  # TODO: proveer TV_USERNAME / TV_PASSWORD si el flujo de login es requerido por el AUT.
  expect(@player_tv_page).not_to be_nil
end

Given('el player de TV integra el nuevo diseño del panel de metadata') do
  # Precondición de contexto: build del player con el nuevo panel de metadata.
  expect(@player_tv_page).not_to be_nil
end

Then('el nuevo panel de metadata no se muestra en el player de TV') do
  expect(@player_tv_page.metadata_panel_visible?).to be(false)
end

Then('el player mantiene su funcionamiento habitual sin regresiones ni elementos del nuevo panel') do
  expect(@player_tv_page.playing?).to be(true)
  expect(@player_tv_page.metadata_panel_visible?).to be(false)
end
