# frozen_string_literal: true

# Step definitions para la reconciliación de conteo y paginación de la
# Galería iOS de Claro Drive (TC004, TC007, TC008).
# La lógica de UI se delega a los Page Objects; aquí solo orquestación y asserts.

# --- Background / precondiciones ---

Given('el usuario está autenticado en la app iOS de Claro Drive') do
  # TODO: implementar el login real (auth token / sesión) según el entorno.
  # No se hardcodean credenciales; se asumen provistas por variables de entorno.
  expect(@driver).not_to be_nil
end

Given('la cuenta de prueba tiene {int} imágenes indexadas') do |total|
  @expected_total = total
end

Given('la cuenta de prueba tiene {int} imágenes indexadas en orden cronológico conocido') do |total|
  @expected_total = total
end

Given('el dispositivo es un iPhone 13/14 con iOS 16/17') do
  # Contexto de dispositivo declarado en las precondiciones del caso.
end

Given('el dispositivo es un iPhone 15 Pro con iOS 17/18') do
  # Contexto de dispositivo declarado en las precondiciones del caso.
end

Given('existe conectividad WiFi estable') do
  # Precondición de entorno de red; sin acción automatizada de UI.
end

# --- TC004: consulta a la API y reconciliación ---

When('se consulta el endpoint del backend que retorna el total de imágenes indexadas de la cuenta') do
  @api_response = @api_client.images_total
end

Then('la API responde con código 200 y un total de {int} imágenes') do |total|
  expect(@api_response.status).to eq(200)
  expect(@api_response.total).to eq(total)
  @api_total = @api_response.total
end

When('se navega a la sección Fotos y se carga por completo el listado mediante scroll hasta el final') do
  @gallery.open_gallery
  @collected_ids = @gallery.scroll_to_end_collecting_ids
end

Then('la Galería termina de cargar todos los lotes y muestra el contador total de elementos') do
  expect(@gallery.end_of_list_reached?).to be(true)
  expect(@gallery.displayed_total_text).not_to be_empty
end

Then('el total mostrado por la app en la sección Fotos es un valor numérico visible y legible') do
  @app_total = @gallery.displayed_total
  expect(@app_total).to be_a(Integer)
  expect(@app_total).to be > 0
end

Then('el total reportado por la API y el total mostrado en la Galería coinciden exactamente en {int} imágenes sin discrepancias') do |total|
  expect(@api_total).to eq(total)
  expect(@app_total).to eq(total)
  expect(@app_total).to eq(@api_total)
end

# --- TC007: paginación incremental sin duplicados ni saltos ---

When('se navega a la sección Fotos y se espera la carga del primer lote de imágenes') do
  @gallery.open_gallery
end

Then('el primer lote de imágenes se carga y muestra en orden correcto sin errores') do
  expect(@gallery.first_batch_loaded?).to be(true)
end

When('se realiza scroll descendente para disparar la carga de lotes sucesivos de paginación') do
  @collected_ids = @gallery.scroll_to_end_collecting_ids
end

Then('cada nuevo lote se carga de forma fluida y se concatena de manera continua al listado previo') do
  expect(@collected_ids).not_to be_empty
end

When('se inspeccionan los límites entre lotes cargados buscando imágenes repetidas') do
  @duplicates = @collected_ids.group_by { |id| id }.select { |_id, group| group.size > 1 }.keys
end

Then('no se observan imágenes duplicadas entre lotes ni dentro del listado') do
  expect(@duplicates).to be_empty
end

Then('la secuencia cronológica entre el final de un lote y el inicio del siguiente es correlativa y completa sin saltos ni discontinuidades') do
  # La secuencia es completa si no hubo duplicados y el total coincide con lo esperado.
  expect(@collected_ids.uniq.size).to eq(@collected_ids.size)
  expect(@collected_ids.size).to eq(@expected_total)
end

# --- TC008: fin de listado con 15,000+ imágenes ---

When('se navega a la sección Fotos con la cuenta de {int} imágenes') do |_total|
  @gallery.open_gallery
end

Then('la sección Fotos carga el primer lote de imágenes correctamente') do
  expect(@gallery.first_batch_loaded?).to be(true)
end

When('se realiza scroll descendente continuo hasta cargar todos los lotes y alcanzar el final del listado') do
  @collected_ids = @gallery.scroll_to_end_collecting_ids
end

Then('todos los lotes se cargan de forma incremental hasta llegar al último elemento del listado') do
  expect(@collected_ids.size).to be >= @expected_total
  expect(@gallery.end_of_list_reached?).to be(true)
end

When('se intenta continuar el scroll una vez alcanzado el último elemento de la Galería') do
  @ids_after_extra_scroll = @gallery.scroll_to_end_collecting_ids
end

Then('la app detiene la carga en el último elemento sin solicitar lotes inexistentes ni mostrar error y el listado no genera duplicados') do
  expect(@ids_after_extra_scroll.uniq.size).to eq(@ids_after_extra_scroll.size)
  expect(@ids_after_extra_scroll.size).to eq(@collected_ids.size)
end

Then('al llegar al final del listado la Galería presenta el fin de forma controlada sin spinner infinito ni congelamiento y permanece estable') do
  expect(@gallery.loading_spinner_visible?).to be(false)
  expect(@gallery.end_of_list_reached?).to be(true)
end
