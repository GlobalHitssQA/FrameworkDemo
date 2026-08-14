# frozen_string_literal: true

# Steps específicos de TC005 - Intento de reproducción de evento en vivo sin derecho.

Given('el usuario no cuenta con derecho de reproducción sobre el evento en vivo') do
  # TODO: preparar cuenta sin entitlement sobre el evento (dato provisto por ENV).
  expect(@player_tv_page).not_to be_nil
end

Given('existe un evento en vivo disponible en la grilla de contenidos') do
  # TODO: garantizar disponibilidad del evento en vivo en la grilla (dato provisto por ENV/backend).
  expect(@player_tv_page).not_to be_nil
end

When('selecciona un evento en vivo sin derecho de reproducción desde la grilla de contenidos') do
  @player_tv_page.select_live_event_without_rights
end

Then('el evento en vivo queda resaltado en la grilla') do
  expect(@player_tv_page.live_event_highlighted?).to be(true)
end

When('ejecuta la acción de reproducir el evento en vivo sin derecho de reproducción') do
  @player_tv_page.play
end

Then('el player de TV no inicia la reproducción y muestra el comportamiento de falta de derecho definido') do
  expect(@player_tv_page.playing?).to be(false)
  expect(@player_tv_page.no_rights_behavior_shown?).to be(true)
end

Then('el player mantiene su funcionamiento habitual sin regresiones ni bloqueos') do
  expect(@player_tv_page.no_rights_behavior_shown?).to be(true)
end
