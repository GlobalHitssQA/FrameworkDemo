Feature: Visualizacion del nuevo panel de metadata en Player de TV con evento en vivo
  Como usuario con sesion iniciada en la aplicacion de TV
  Quiero visualizar el nuevo panel de metadata al reproducir un evento en vivo con derecho de reproduccion
  Para consultar la metadata del evento conforme al diseno definido

  Background:
    Given que el usuario cuenta con una sesion iniciada en la aplicacion de TV
    And que el nuevo diseno del panel de metadata esta desplegado en el ambiente

  @PruebaGeneradaIA @QC-CP001
  Scenario: Visualizar el panel de metadata al reproducir un evento en vivo con derecho de reproduccion
    Given que existe un evento en vivo con derecho de reproduccion en la grilla del player de TV
    When ubico un evento en vivo con derecho de reproduccion en la grilla de contenidos
    Then el evento en vivo se muestra disponible y seleccionable en la grilla del player de TV
    When selecciono el evento en vivo para iniciar la reproduccion en el player de TV
    Then el player de TV inicia la reproduccion del evento en vivo sin errores
    When abro el nuevo panel de metadata desde el player de TV durante la reproduccion del evento en vivo
    Then el nuevo panel de metadata se visualiza correctamente sobre el player de TV conforme al diseno definido en los insumos
    When observo la informacion de metadata mostrada en el panel
    Then la metadata del evento en vivo se muestra completa y legible segun la definicion de llaves de los insumos
