# encoding: utf-8
#
# Pasos de TC004: comparacion del conteo de imagenes entre la Galeria iOS y el backend/API.

When('consulto el endpoint del backend/API que reporta el total de imagenes indexadas para la cuenta de prueba') do
  @backend_total = @backend.total_indexed_images
end

Then('el backend responde con el total de imagenes indexadas en una respuesta exitosa') do
  expect(@backend.last_response_successful?).to be true
  expect(@backend_total).to be_a(Integer)
  expect(@backend_total).to be > 0
end

When('abro la seccion Fotos y hago scroll hasta cargar la totalidad de las imagenes de la cuenta') do
  @gallery_page.open_photos_section
  @gallery_page.scroll_to_end
end

Then('la Galeria carga y muestra todas las imagenes disponibles hasta el final del listado') do
  expect(@gallery_page.loaded_image_ids).not_to be_empty
end

When('obtengo el conteo total de imagenes visibles mostrado por la app en la seccion Fotos') do
  @gallery_total = @gallery_page.displayed_total_count
end

Then('la app expone un conteo total de imagenes correspondiente a la cuenta de prueba') do
  expect(@gallery_total).to be_a(Integer)
  expect(@gallery_total).to be > 0
end

When('comparo el conteo total mostrado en la Galeria contra el total reportado por el backend/API') do
  @count_match = (@gallery_total == @backend_total)
end

Then('ambos totales coinciden exactamente reflejando el 100% de las imagenes indexadas en la Galeria') do
  expect(@count_match).to be(true), "Galeria=#{@gallery_total} vs Backend=#{@backend_total}"
end
