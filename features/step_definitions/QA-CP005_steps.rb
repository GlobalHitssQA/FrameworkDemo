# Step definitions para QA-CP005: manejo de respuestas del backend de metadata.

Given('el Player de TV está integrado con el servicio de backend de metadata') do
  @panel_metadata_backend_page = PanelMetadataBackendPage.new(@driver)
  # TODO: validar la integración real con el servicio de backend de metadata.
end

Given('existe un evento en vivo con derecho de reproducción') do
  # Precondición de datos: evento en vivo con derecho de reproducción.
  # TODO: garantizar en el entorno un usuario con derecho sobre el evento.
end

Given('es posible simular respuestas del backend de metadata') do
  # Precondición técnica: capacidad de mockear el backend de metadata.
  # TODO: habilitar el mecanismo de simulación (mock/stub/proxy) en el entorno.
end

When('simulo una respuesta del backend de metadata con campos vacíos o ausentes para el evento en vivo') do
  @panel_metadata_backend_page.simular_respuesta_backend(:campos_incompletos)
end

When('simulo una respuesta del backend de metadata sin datos para el evento en vivo') do
  @panel_metadata_backend_page.simular_respuesta_backend(:payload_vacio)
end

When('simulo una respuesta de error del backend de metadata con código distinto de 200 durante la reproducción') do
  @panel_metadata_backend_page.simular_respuesta_backend(:error_http)
end

Then('el Player de TV procesa la respuesta parcial sin fallos ni cierres inesperados') do
  expect(@panel_metadata_backend_page.player_estable?).to be true
end

Then('el panel muestra los campos disponibles y gestiona los campos ausentes sin mostrar valores nulos crudos') do
  expect(@panel_metadata_backend_page.panel_metadata_desplegado?).to be true
  expect(@panel_metadata_backend_page.muestra_valores_nulos_crudos?).to be false
end

Then('el Player de TV controla la ausencia total de metadata sin errores no controlados') do
  expect(@panel_metadata_backend_page.player_estable?).to be true
end

Then('el Player de TV mantiene la reproducción del evento') do
  expect(@panel_metadata_backend_page.reproduccion_activa?).to be true
end

Then('el Player de TV gestiona el error de forma controlada y no despliega datos inválidos') do
  expect(@panel_metadata_backend_page.muestra_datos_invalidos?).to be false
end

Then('el Player de TV conserva la estabilidad del player') do
  expect(@panel_metadata_backend_page.player_estable?).to be true
end
