@PruebaGeneradaIA @QA-CP003
Feature: Control de acceso al panel de metadata del player de TV sin derecho
  Como equipo de QA
  Quiero verificar que el panel de metadata no se despliega para eventos sin derecho
  Para asegurar que el control de acceso funciona sin regresiones

  Background:
    Given el usuario cuenta con sesión iniciada en la app de TV
    And existe un evento en vivo
    And el usuario no tiene derecho de reproducción sobre el evento en vivo

  Scenario: El panel de metadata no se despliega para un evento sin derecho de reproducción
    When accedo al evento en vivo sin derecho de reproducción desde el player de TV
    Then el player de TV no inicia la reproducción del evento en vivo
    And el nuevo panel de metadata de evento en vivo no se despliega
    And el player de TV mantiene su comportamiento previo sin errores ni bloqueos indebidos
