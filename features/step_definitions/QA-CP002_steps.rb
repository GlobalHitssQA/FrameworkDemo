# Step definitions para QA-CP002: control de derecho de reproducción en el Player de TV.

Given('el usuario cuenta con sesión iniciada en la aplicación de TV') do
  @player_tv_derecho_page = PlayerTvDerechoPage.new(@driver)
  # TODO: implementar/validar el estado de sesión iniciada según la app real.
  expect(@player_tv_derecho_page.player_estable?).to be true
end

Given('existe un evento en vivo disponible') do
  # Precondición de datos: el evento en vivo debe existir en el entorno bajo prueba.
  # TODO: garantizar la disponibilidad del evento en vivo en el entorno.
end

Given('el usuario NO posee derecho de reproducción sobre el evento en vivo') do
  # Precondición de datos: el usuario no tiene derecho de reproducción.
  # TODO: garantizar en el entorno un usuario sin derecho sobre el evento.
end

When('selecciono un evento en vivo sobre el cual el usuario no tiene derecho de reproducción') do
  @player_tv_derecho_page.seleccionar_evento_sin_derecho
end

Then('el Player de TV evalúa el derecho de reproducción y no inicia la reproducción del evento') do
  expect(@player_tv_derecho_page.reproduccion_iniciada?).to be false
end

Then('el nuevo panel de metadata no se despliega') do
  expect(@player_tv_derecho_page.panel_metadata_desplegado?).to be false
end

Then('el Player de TV muestra el comportamiento estándar de acceso denegado sin errores no controlados') do
  expect(@player_tv_derecho_page.acceso_denegado_mostrado?).to be true
end

Then('el Player de TV conserva su comportamiento base sin fallos ni bloqueos derivados de la integración del panel') do
  expect(@player_tv_derecho_page.player_estable?).to be true
end
