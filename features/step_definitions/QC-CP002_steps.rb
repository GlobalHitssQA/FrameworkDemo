# Step definitions para QC-CP002: acceso al panel de metadata desde cada punto de entrada.

Given('están habilitados los puntos de entrada listados que conducen al Player de TV') do
  @panel_metadata_puntos_entrada_page = PanelMetadataPuntosEntradaPage.new(@driver)
  # TODO: garantizar que los puntos de entrada listados estén habilitados en el entorno.
end

When('accedo al evento en vivo con derecho de reproducción desde el punto de entrada {string}') do |punto|
  @punto_de_entrada_actual = punto
  @panel_metadata_puntos_entrada_page.acceder_desde_punto_de_entrada(punto)
end

Then('el Player de TV se abre y el panel de metadata se visualiza correctamente desde ese punto de entrada') do
  expect(@panel_metadata_puntos_entrada_page.player_abierto?).to be true
  expect(@panel_metadata_puntos_entrada_page.panel_metadata_visible?).to be true
end

Then('el panel de metadata mantiene la misma estructura, datos y comportamiento independientemente del punto de entrada') do
  huella_actual = @panel_metadata_puntos_entrada_page.huella_panel_metadata
  @huella_panel_referencia ||= huella_actual
  expect(huella_actual).to eq(@huella_panel_referencia)
end
