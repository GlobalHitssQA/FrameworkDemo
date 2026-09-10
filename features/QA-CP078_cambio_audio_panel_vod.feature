# language: en
Feature: QA-CP078 Cambio automático de audio en el Panel del Player VOD
  Como usuario que reproduce contenido VOD (Android / Fire TV / Android TV)
  quiero que al seleccionar una nueva opción de audio en el Panel
  el cambio se aplique automáticamente sin confirmación adicional.

  Background:
    Given que el usuario está autenticado en la plataforma
    And que el usuario reproduce un contenido VOD con al menos dos pistas de audio
    And que el Panel de Audio y Subtítulos está desplegado

  @PruebaGeneradaIA @QA-CP078
  Scenario: Seleccionar una nueva opción de audio y aplicar el cambio automáticamente
    When el usuario visualiza las opciones de audio disponibles en el Panel
    And el usuario selecciona una opción de audio distinta a la actualmente activa
    Then el cambio de audio se aplica automáticamente sin necesidad de confirmación adicional
    And el contenido reproduce la nueva pista de audio seleccionada
