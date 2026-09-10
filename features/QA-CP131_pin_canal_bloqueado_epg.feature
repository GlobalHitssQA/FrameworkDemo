# language: en
Feature: QA-CP131 Solicitud de PIN al reproducir un evento de canal bloqueado en la EPG
  Como plataforma de EPG (Android / Fire TV / Android TV)
  quiero solicitar el PIN de seguridad al intentar reproducir un evento
  de un canal bloqueado, sin iniciar la reproducción hasta validar el PIN.

  Background:
    Given que el usuario está autenticado en la plataforma
    And que el usuario selecciona un evento de un canal bloqueado en la guía de programación

  @PruebaGeneradaIA @QA-CP131
  Scenario: Mostrar pantalla de PIN al reproducir un evento de canal bloqueado
    When el usuario selecciona la opción de reproducir el evento del canal bloqueado en la EPG
    Then el API "/user/v2/controlpin/channels/check" responde con status 200 y channels_check en true
    And se muestra la pantalla para ingresar el PIN de seguridad
    And el evento no se reproduce mientras no se valide el PIN de seguridad
