# language: en
Feature: Panel de metadata en el player de TV durante evento en vivo con derecho de reproducción
  Como usuario con sesión iniciada en la app de TV
  quiero visualizar el nuevo panel de metadata en el player durante un evento en vivo
  para consultar la información del evento sin interrumpir la reproducción

  Background:
    Given el usuario tiene sesión iniciada en la app de TV
    And existe un evento en vivo con derecho de reproducción disponible
    And el backend de metadata está operativo

  @PruebaGeneradaIA @QA-CP001
  Scenario: Visualizar el panel de metadata sobre el player sin bloquear la reproducción
    When el usuario accede al evento en vivo con derecho de reproducción desde un punto de entrada del player de TV
    And se invoca la carga del componente del panel de metadata en el player de TV
    Then el player de TV inicia la reproducción del evento en vivo sin errores
    And el panel de metadata se renderiza sobre el player sin bloquear la reproducción
    And los campos de metadata respetan las llaves y el conteo de caracteres definidos en los insumos
    And la reproducción del evento en vivo continúa activa mientras el panel está visible
