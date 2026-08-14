# frozen_string_literal: true

# Steps específicos de TC004 - El panel de metadata no se muestra en eventos que no son en vivo.

Given('existe un evento que no es en vivo disponible en la grilla de contenidos') do
  # TODO: garantizar disponibilidad de un evento VOD/finalizado (dato provisto por ENV/backend).
  expect(@player_tv_page).not_to be_nil
end

When('selecciona un evento que no es en vivo desde la grilla de contenidos') do
  @player_tv_page.select_non_live_event
end

Then('el evento no en vivo queda resaltado y se habilita la acción de reproducción') do
  expect(@player_tv_page.non_live_event_highlighted_and_playable?).to be(true)
end

When('ejecuta la acción de reproducir el evento no en vivo seleccionado') do
  @player_tv_page.play
end

Then('el player de TV inicia la reproducción del contenido sin errores') do
  expect(@player_tv_page.playing?).to be(true)
end
