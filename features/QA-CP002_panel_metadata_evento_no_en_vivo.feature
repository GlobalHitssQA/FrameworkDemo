Feature: Panel de metadata en Player de TV para eventos que no son en vivo
  Como usuario con sesion iniciada en la aplicacion de TV
  Quiero que el nuevo panel de metadata no se despliegue para eventos que no son en vivo
  Para que el player conserve su funcionamiento sin regresiones

  Background:
    Given que el usuario cuenta con una sesion iniciada en la aplicacion de TV
    And que el nuevo diseno del panel de metadata esta desplegado en el ambiente

  @PruebaGeneradaIA @QA-CP002
  Scenario: El panel de metadata no se despliega al reproducir un evento que no es en vivo
    Given que existe un evento que no es en vivo en la grilla del player de TV
    When ubico en la grilla del player de TV un evento que no es en vivo
    Then el evento no en vivo se muestra disponible y seleccionable en la grilla
    When selecciono el evento no en vivo para iniciar su reproduccion en el player de TV
    Then el player de TV inicia la reproduccion del evento no en vivo sin errores
    When verifico el estado del nuevo panel de metadata durante la reproduccion del evento no en vivo
    Then el nuevo panel de metadata no se despliega en el player de TV
    And el player de TV conserva su funcionamiento previo sin regresiones ni errores asociados al nuevo panel
