Feature: Player de TV - El panel de metadata no se muestra en eventos que no son en vivo
  Como usuario autenticado en la aplicación de TV
  Quiero reproducir un evento que no es en vivo (VOD o finalizado)
  Para verificar que el nuevo panel de metadata no se muestra y el player funciona sin regresiones

  Background:
    Given el usuario está autenticado en la aplicación de TV
    And existe un evento que no es en vivo disponible en la grilla de contenidos
    And el player de TV integra el nuevo diseño del panel de metadata

  @PruebaGeneradaIA @TC004
  Scenario: Reproducir un evento no en vivo no muestra el panel de metadata
    When selecciona un evento que no es en vivo desde la grilla de contenidos
    Then el evento no en vivo queda resaltado y se habilita la acción de reproducción
    When ejecuta la acción de reproducir el evento no en vivo seleccionado
    Then el player de TV inicia la reproducción del contenido sin errores
    And el nuevo panel de metadata no se muestra en el player de TV
    And el player mantiene su funcionamiento habitual sin regresiones ni elementos del nuevo panel
