# frozen_string_literal: true

# Step definitions para los casos de esta corrida: QA-CP002, QA-CP004, QC-CP001.
# App nativa "Player de TV" (Android TV / Appium UiAutomator2).
# Las definiciones son unicas y no ambiguas; usan el Page Object TvPlayerPage.

require_relative '../pages/tv_player_page'

def tv_player_page
  @tv_player_page ||= TvPlayerPage.new(driver)
end

# --- Preconditions / Background ---

Given('que el usuario cuenta con una sesion iniciada en la aplicacion de TV') do
  # Precondicion: sesion iniciada en la app de TV.
  # TODO: automatizar/validar el login segun el flujo real de la app de TV.
  expect(driver).not_to be_nil
end

Given('que el nuevo diseno del panel de metadata esta desplegado en el ambiente') do
  # Precondicion de ambiente: nuevo panel de metadata desplegado.
  # TODO: validar el flag/feature del nuevo panel segun el mecanismo real.
end

Given('que el nuevo panel de metadata esta desplegado y los puntos de entrada habilitados') do
  # Precondicion de ambiente: nuevo panel desplegado y puntos de entrada habilitados.
  # TODO: validar los puntos de entrada habilitados listados en los insumos.
  expect(tv_player_page.metadata_entry_point_locators).not_to be_nil
end

# --- QA-CP002: evento no en vivo ---

Given('que existe un evento que no es en vivo en la grilla del player de TV') do
  expect(tv_player_page.event_visible?(tv_player_page.non_live_event_locator)).to be_truthy
end

When('ubico en la grilla del player de TV un evento que no es en vivo') do
  @evento_actual = tv_player_page.non_live_event_locator
end

Then('el evento no en vivo se muestra disponible y seleccionable en la grilla') do
  expect(tv_player_page.event_visible?(@evento_actual)).to be_truthy
end

When('selecciono el evento no en vivo para iniciar su reproduccion en el player de TV') do
  tv_player_page.select_event(tv_player_page.non_live_event_locator)
end

Then('el player de TV inicia la reproduccion del evento no en vivo sin errores') do
  expect(tv_player_page.player_playing?).to be_truthy
end

When('verifico el estado del nuevo panel de metadata durante la reproduccion del evento no en vivo') do
  @metadata_desplegado = tv_player_page.metadata_panel_displayed?
end

Then('el nuevo panel de metadata no se despliega en el player de TV') do
  expect(@metadata_desplegado).to be_falsey
end

Then('el player de TV conserva su funcionamiento previo sin regresiones ni errores asociados al nuevo panel') do
  expect(tv_player_page.player_playing?).to be_truthy
end

# --- QA-CP004: puntos de acceso con evento en vivo ---

Given('que existe un evento en vivo con derecho de reproduccion') do
  expect(tv_player_page.event_visible?(tv_player_page.live_event_locator)).to be_truthy
end

When('inicio la reproduccion de un evento en vivo con derecho de reproduccion en el player de TV') do
  tv_player_page.select_event(tv_player_page.live_event_locator)
end

Then('el player de TV reproduce el evento en vivo y habilita los puntos de acceso al panel de metadata') do
  expect(tv_player_page.player_playing?).to be_truthy
  expect(tv_player_page.metadata_entry_point_locators).not_to be_empty
end

When('invoco el panel de metadata desde el primer punto de entrada habilitado') do
  primer_punto = tv_player_page.metadata_entry_point_locators.first
  tv_player_page.open_metadata_panel(primer_punto)
end

Then('el panel de metadata se despliega correctamente desde el primer punto de entrada') do
  expect(tv_player_page.metadata_panel_displayed?).to be_truthy
end

When('cierro el panel e invoco nuevamente el panel desde cada uno de los demas puntos de entrada habilitados') do
  @metadata_por_punto = []
  tv_player_page.metadata_entry_point_locators.drop(1).each do |punto|
    tv_player_page.close_metadata_panel
    tv_player_page.open_metadata_panel(punto)
    @metadata_por_punto << tv_player_page.metadata_panel_text
  end
end

Then('el panel de metadata se despliega correctamente desde cada punto de entrada habilitado mostrando la misma metadata del evento') do
  expect(tv_player_page.metadata_panel_displayed?).to be_truthy
  expect(@metadata_por_punto.uniq.size).to be <= 1
end

When('comparo el contenido y comportamiento del panel de metadata desplegado desde los distintos puntos de entrada') do
  @metadata_referencia = tv_player_page.metadata_panel_text
end

Then('el panel presenta contenido y comportamiento consistentes independientemente del punto de entrada utilizado') do
  @metadata_por_punto.each do |contenido|
    expect(contenido).to eq(@metadata_referencia)
  end
end

# --- QC-CP001: visualizacion del panel con evento en vivo ---

Given('que existe un evento en vivo con derecho de reproduccion en la grilla del player de TV') do
  expect(tv_player_page.event_visible?(tv_player_page.live_event_locator)).to be_truthy
end

When('ubico un evento en vivo con derecho de reproduccion en la grilla de contenidos') do
  @evento_actual = tv_player_page.live_event_locator
end

Then('el evento en vivo se muestra disponible y seleccionable en la grilla del player de TV') do
  expect(tv_player_page.event_visible?(@evento_actual)).to be_truthy
end

When('selecciono el evento en vivo para iniciar la reproduccion en el player de TV') do
  tv_player_page.select_event(tv_player_page.live_event_locator)
end

Then('el player de TV inicia la reproduccion del evento en vivo sin errores') do
  expect(tv_player_page.player_playing?).to be_truthy
end

When('abro el nuevo panel de metadata desde el player de TV durante la reproduccion del evento en vivo') do
  primer_punto = tv_player_page.metadata_entry_point_locators.first
  tv_player_page.open_metadata_panel(primer_punto)
end

Then('el nuevo panel de metadata se visualiza correctamente sobre el player de TV conforme al diseno definido en los insumos') do
  expect(tv_player_page.metadata_panel_displayed?).to be_truthy
end

When('observo la informacion de metadata mostrada en el panel') do
  @metadata_visible = tv_player_page.metadata_panel_text
end

Then('la metadata del evento en vivo se muestra completa y legible segun la definicion de llaves de los insumos') do
  # TODO: validar contra la definicion real de llaves (titulo, datos del evento)
  # de los insumos cuando esten disponibles.
  expect(@metadata_visible).not_to be_nil
end
