Feature: Player de TV ante un evento en vivo sin derecho de reproduccion
  Como sistema de reproduccion de TV
  quiero manejar correctamente el acceso a un evento en vivo sin derecho de reproduccion,
  de forma que no se inicie la reproduccion ni se despliegue el panel de metadata.

  Background:
    Given un usuario con sesion activa en la aplicacion de TV
    And el nuevo panel de metadata esta desplegado en el ambiente de prueba

  @PruebaGeneradaIA @QA-CP003
  Scenario: No se muestra el panel de metadata para un evento en vivo sin derecho de reproduccion
    Given existe un evento en vivo para el cual el usuario no tiene derecho de reproduccion
    When el usuario accede al evento en vivo sin derecho de reproduccion desde el player de TV
    Then el player de TV no inicia la reproduccion y muestra el manejo previsto por falta de derecho
    And el panel de metadata no se muestra para el evento sin derecho de reproduccion
    And el player de TV mantiene su comportamiento base sin regresiones ni errores no controlados
    And los registros del player muestran el acceso denegado sin excepciones tecnicas no controladas
