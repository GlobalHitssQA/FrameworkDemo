# frozen_string_literal: true

# Steps específicos de TC003 - Panel de metadata desde múltiples puntos de entrada.

Given('el usuario cuenta con derecho de reproducción sobre el evento en vivo') do
  # TODO: preparar cuenta/entitlement con derecho de reproducción (dato provisto por ENV).
  expect(@player_tv_page).not_to be_nil
end

Given('existe un evento en vivo accesible desde los distintos puntos de entrada listados') do
  # TODO: garantizar disponibilidad del evento en vivo (dato provisto por ENV/backend).
  expect(@player_tv_page).not_to be_nil
end

When('accede al evento en vivo desde el punto de entrada {string} y ejecuta la reproducción') do |punto_entrada|
  @player_tv_page.open_live_event_from(punto_entrada)
  @player_tv_page.play
end

Then('el player de TV inicia la reproducción y muestra el panel de metadata correctamente') do
  expect(@player_tv_page.playing?).to be(true)
  expect(@player_tv_page.metadata_panel_visible?).to be(true)
  @metadata_snapshots[:primario] = @player_tv_page.metadata_snapshot
end

When('regresa y accede al mismo evento en vivo desde el punto de entrada alterno {string} y ejecuta la reproducción') do |punto_entrada_alterno|
  @player_tv_page.go_back
  @player_tv_page.open_live_event_from(punto_entrada_alterno)
  @player_tv_page.play
end

Then('el player de TV inicia la reproducción y muestra el panel de metadata correctamente desde el punto alterno') do
  expect(@player_tv_page.playing?).to be(true)
  expect(@player_tv_page.metadata_panel_visible?).to be(true)
  @metadata_snapshots[:alterno] = @player_tv_page.metadata_snapshot
end

When('compara el contenido y la disposición del panel de metadata mostrado en cada punto de entrada') do
  expect(@metadata_snapshots[:primario]).not_to be_nil
  expect(@metadata_snapshots[:alterno]).not_to be_nil
end

Then('el panel de metadata se muestra de forma idéntica e independiente del punto de entrada utilizado') do
  expect(@metadata_snapshots[:alterno]).to eq(@metadata_snapshots[:primario])
end

Then('la reproducción del evento en vivo se mantiene continua y estable sin errores ni cierres inesperados del player') do
  expect(@player_tv_page.playing?).to be(true)
end
