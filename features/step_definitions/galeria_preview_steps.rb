# frozen_string_literal: true

# Steps para TC009 (Preview de imagen en Sección Fotos tras la optimización).
# Plataforma iOS -> Appium + XCUITest.

Given('el usuario tiene sesión iniciada con la cuenta de prueba de alto volumen de imágenes') do
  # TODO: implementar login/reuso de sesión con credenciales provenientes del entorno.
  @galeria = GaleriaPage.new
  @preview = PreviewPage.new
end

Given('la sección Fotos (Galería) está accesible con imágenes cargadas') do
  @galeria ||= GaleriaPage.new
end

When('abro la sección Fotos (Galería) con la cuenta de prueba de alto volumen de imágenes') do
  @galeria ||= GaleriaPage.new
  @galeria.abrir_galeria
end

Then('la Galería carga y muestra las miniaturas de las imágenes correctamente') do
  expect(@galeria.primer_lote_visible?).to be true
end

When('selecciono una imagen de la Galería y ejecuto la acción de preview tocando la miniatura') do
  miniatura = @galeria.miniaturas.first
  @miniatura_id = miniatura.attribute('name') || miniatura.attribute('label')
  miniatura.click
  @preview ||= PreviewPage.new
end

Then('la imagen se abre en vista previa a pantalla completa mostrando la imagen correcta seleccionada') do
  expect(@preview.visible?).to be true
end

When('verifico la calidad y correspondencia de la imagen mostrada en la vista previa respecto a la miniatura seleccionada') do
  @preview_id = @preview.identificador_imagen
end

Then('la imagen en preview corresponde exactamente a la miniatura seleccionada y se visualiza con calidad completa sin errores de renderizado') do
  expect(@preview_id).to eq(@miniatura_id)
end

When('cierro la vista previa y regreso al listado de la Galería') do
  @preview.cerrar
end

Then('la vista previa se cierra correctamente y la Galería regresa a la posición previa del listado sin freezes ni crashes') do
  expect(@galeria.primer_lote_visible?).to be true
end
