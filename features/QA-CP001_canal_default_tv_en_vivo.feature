# language: en
Feature: QA-CP001 Reproducción del canal default en el primer acceso a TV en vivo
  Como plataforma de TV en vivo (Android / Fire TV / Android TV)
  quiero reproducir el canal default configurado por la operación
  cuando el perfil accede por primera vez al entorno de TV en vivo.

  Background:
    Given que el usuario está autenticado en la plataforma
    And que es la primera vez que el perfil accede al entorno de TV en vivo
    And que la operación tiene configurado un canal default

  @PruebaGeneradaIA @QA-CP001
  Scenario: Reproducir el canal default de la operación en el primer acceso a TV en vivo
    When el usuario ingresa a TV en vivo desde el menú principal
    Then la aplicación abre la pantalla de TV en vivo sin historial de canal previo
    And el servicio de configuración de la operación responde el canal default con status 200
    And se inicia la reproducción del canal configurado por default por la operación
    And el canal reproducido coincide exactamente con el canal default de la operación
