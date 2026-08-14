# encoding: utf-8
#
# Pasos de TC007: paginacion sin duplicados ni saltos durante el scroll.

When('abro la seccion Fotos y observo la carga del primer lote de imagenes') do
  @gallery_page.open_photos_section
  @first_batch_ids = @gallery_page.loaded_image_ids
end

Then('el primer lote de imagenes se carga y muestra correctamente en la cuadricula') do
  expect(@gallery_page.first_batch_displayed?).to be true
  expect(@first_batch_ids).not_to be_empty
end

When('realizo scroll hacia abajo de forma controlada para disparar la carga incremental del siguiente lote') do
  @gallery_page.scroll_next_batch
  @second_batch_ids = @gallery_page.loaded_image_ids
end

Then('la paginacion carga un nuevo lote de imagenes de forma fluida al alcanzar el umbral de scroll') do
  expect(@second_batch_ids.length).to be > @first_batch_ids.length
end

When('inspecciono la secuencia de imagenes cargadas entre lotes consecutivos') do
  @all_loaded_ids = @second_batch_ids
end

Then('no se presentan imagenes duplicadas entre lotes ni dentro del mismo lote') do
  expect(@all_loaded_ids.uniq.length).to eq(@all_loaded_ids.length)
end

When('verifico la continuidad de la secuencia cronologica al pasar de un lote al siguiente') do
  # Los primeros elementos deben ser el prefijo del listado acumulado (sin saltos).
  @sequence_continuous = (@all_loaded_ids[0, @first_batch_ids.length] == @first_batch_ids)
end

Then('no existen saltos ni discontinuidades y las imagenes mantienen el orden esperado') do
  expect(@sequence_continuous).to be true
end
