# language: en
Feature: Preview de imagen en la Sección Fotos (Galería) de Claro Drive iOS
  Como usuario de Claro Drive iOS con una cuenta de alto volumen de imágenes
  Quiero abrir la vista previa de una imagen desde la Galería
  Para confirmar que el preview funciona correctamente tras la optimización

  Background:
    Given la app Claro Drive iOS está instalada y actualizada con la optimización de CDIS-10000
    And el usuario tiene sesión iniciada con la cuenta de prueba de alto volumen de imágenes
    And la sección Fotos (Galería) está accesible con imágenes cargadas
    And se cuenta con conectividad estable

  @PruebaGeneradaIA @TC009
  Scenario: Ejecutar acción de preview sobre una imagen en Galería y verificar que funciona correctamente tras la optimización
    When abro la sección Fotos (Galería) con la cuenta de prueba de alto volumen de imágenes
    Then la Galería carga y muestra las miniaturas de las imágenes correctamente
    When selecciono una imagen de la Galería y ejecuto la acción de preview tocando la miniatura
    Then la imagen se abre en vista previa a pantalla completa mostrando la imagen correcta seleccionada
    When verifico la calidad y correspondencia de la imagen mostrada en la vista previa respecto a la miniatura seleccionada
    Then la imagen en preview corresponde exactamente a la miniatura seleccionada y se visualiza con calidad completa sin errores de renderizado
    When cierro la vista previa y regreso al listado de la Galería
    Then la vista previa se cierra correctamente y la Galería regresa a la posición previa del listado sin freezes ni crashes
