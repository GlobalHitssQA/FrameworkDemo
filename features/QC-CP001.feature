@PruebaGeneradaIA @QC-CP001
Feature: Panel de metadata en el player de TV con derecho de reproducción
  Como usuario autenticado con derecho de reproducción
  Quiero visualizar el nuevo panel de metadata al reproducir un evento en vivo
  Para consultar la información del evento conforme al diseño definido

  Background:
    Given el usuario cuenta con sesión iniciada en la app de TV
    And existe un evento en vivo disponible
    And el usuario tiene derecho de reproducción sobre el evento en vivo

  Scenario: Visualizar el panel de metadata al reproducir un evento en vivo con derecho
    When ingreso al evento en vivo desde el player de TV
    Then el player de TV inicia la reproducción del evento en vivo sin errores
    And el nuevo panel de metadata se despliega sobre el player de TV
    And la metadata mostrada es consistente con la información del evento en vivo
    And el panel de metadata respeta el layout y la estructura definidos en los insumos
