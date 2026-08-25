Feature: Control de derecho de reproducción en el Player de TV
  Como sistema de control de acceso del Player de TV
  Quiero evaluar el derecho de reproducción antes de iniciar un evento en vivo
  Para impedir la reproducción cuando el usuario no posee derecho, sin regresiones

  Background:
    Given el usuario cuenta con sesión iniciada en la aplicación de TV
    And existe un evento en vivo disponible
    And el usuario NO posee derecho de reproducción sobre el evento en vivo

  @PruebaGeneradaIA @QA-CP002
  Scenario: Acceso denegado a un evento en vivo sin derecho de reproducción sin regresiones
    When selecciono un evento en vivo sobre el cual el usuario no tiene derecho de reproducción
    Then el Player de TV evalúa el derecho de reproducción y no inicia la reproducción del evento
    And el nuevo panel de metadata no se despliega
    And el Player de TV muestra el comportamiento estándar de acceso denegado sin errores no controlados
    And el Player de TV conserva su comportamiento base sin fallos ni bloqueos derivados de la integración del panel
