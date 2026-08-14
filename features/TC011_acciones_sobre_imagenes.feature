# language: en
Feature: Acciones sobre imagenes tras la optimizacion en la Galeria iOS
  Como usuario autenticado de la app iOS de Claro Drive
  quiero que las acciones de preview, compartir, mover y eliminar funcionen correctamente
  para validar que la optimizacion de CDIS-10000 no afecta la operacion sobre las imagenes

  Background:
    Given el usuario esta autenticado en la app iOS de Claro Drive
    And la app esta actualizada con la optimizacion de CDIS-10000
    And la cuenta de prueba tiene imagenes indexadas en la Galeria
    And el dispositivo cuenta con conexion estable a la red

  @PruebaGeneradaIA @TC011
  Scenario: Preview de una imagen a resolucion completa
    When selecciono una imagen en la seccion Fotos y abro su vista previa
    Then la imagen se abre en preview a resolucion completa sin errores de renderizado

  @PruebaGeneradaIA @TC011
  Scenario: Compartir una imagen hacia un destino disponible
    When selecciono una imagen en la seccion Fotos
    And ejecuto la accion Compartir y elijo un destino de comparticion
    Then se despliega la hoja de compartir y la imagen se envia correctamente al destino seleccionado

  @PruebaGeneradaIA @TC011
  Scenario: Mover una imagen hacia otra carpeta
    When selecciono una imagen en la seccion Fotos
    And ejecuto la accion Mover hacia otra carpeta o destino disponible
    Then la imagen se reubica en el destino elegido y desaparece de su ubicacion original en la Galeria

  @PruebaGeneradaIA @TC011
  Scenario: Eliminar una imagen de la Galeria
    When selecciono una imagen en la seccion Fotos
    And ejecuto la accion Eliminar y confirmo la eliminacion
    Then la imagen se elimina de la Galeria y deja de mostrarse tras refrescar la vista sin afectar el resto del listado
