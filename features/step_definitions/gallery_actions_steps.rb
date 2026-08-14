# encoding: utf-8
#
# Pasos de TC011: acciones de preview, compartir, mover y eliminar sobre imagenes.

When('selecciono una imagen en la seccion Fotos y abro su vista previa') do
  @gallery_page.open_photos_section
  @gallery_page.select_first_image
  @gallery_page.open_preview
end

Then('la imagen se abre en preview a resolucion completa sin errores de renderizado') do
  expect(@gallery_page.preview_displayed_full_resolution?).to be true
end

When('selecciono una imagen en la seccion Fotos') do
  @gallery_page.open_photos_section
  @gallery_page.select_first_image
end

When('ejecuto la accion Compartir y elijo un destino de comparticion') do
  @gallery_page.share_to_destination
end

Then('se despliega la hoja de compartir y la imagen se envia correctamente al destino seleccionado') do
  expect(@gallery_page.share_sheet_completed?).to be true
end

When('ejecuto la accion Mover hacia otra carpeta o destino disponible') do
  @gallery_page.move_to_folder
end

Then('la imagen se reubica en el destino elegido y desaparece de su ubicacion original en la Galeria') do
  expect(@gallery_page.image_absent_from_origin?).to be true
end

When('ejecuto la accion Eliminar y confirmo la eliminacion') do
  @gallery_page.delete_and_confirm
end

Then('la imagen se elimina de la Galeria y deja de mostrarse tras refrescar la vista sin afectar el resto del listado') do
  @gallery_page.refresh
  expect(@gallery_page.image_deleted?).to be true
end
