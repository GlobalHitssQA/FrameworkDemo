Feature: Player de TV - Intento de reproducción de evento en vivo sin derecho de reproducción
  Como usuario autenticado sin derecho de reproducción sobre el evento
  Quiero intentar reproducir un evento en vivo
  Para verificar que el player no reproduce, no muestra el panel de metadata y no presenta regresiones

  Background:
    Given el usuario está autenticado en la aplicación de TV
    And el usuario no cuenta con derecho de reproducción sobre el evento en vivo
    And existe un evento en vivo disponible en la grilla de contenidos
    And el player de TV integra el nuevo diseño del panel de metadata

  @PruebaGeneradaIA @TC005
  Scenario: Intentar reproducir un evento en vivo sin derecho no muestra el panel de metadata
    When selecciona un evento en vivo sin derecho de reproducción desde la grilla de contenidos
    Then el evento en vivo queda resaltado en la grilla
    When ejecuta la acción de reproducir el evento en vivo sin derecho de reproducción
    Then el player de TV no inicia la reproducción y muestra el comportamiento de falta de derecho definido
    And el nuevo panel de metadata no se muestra en el player de TV
    And el player mantiene su funcionamiento habitual sin regresiones ni bloqueos
