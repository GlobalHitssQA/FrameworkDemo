Feature: Puntos de acceso al panel de metadata en Player de TV con evento en vivo
  Como usuario con sesion iniciada en la aplicacion de TV
  Quiero acceder al panel de metadata desde cada punto de entrada habilitado
  Para confirmar que es consistente en un evento en vivo con derecho de reproduccion

  Background:
    Given que el usuario cuenta con una sesion iniciada en la aplicacion de TV
    And que el nuevo panel de metadata esta desplegado y los puntos de entrada habilitados

  @PruebaGeneradaIA @QA-CP004
  Scenario: Acceso consistente al panel de metadata desde todos los puntos de entrada habilitados
    Given que existe un evento en vivo con derecho de reproduccion
    When inicio la reproduccion de un evento en vivo con derecho de reproduccion en el player de TV
    Then el player de TV reproduce el evento en vivo y habilita los puntos de acceso al panel de metadata
    When invoco el panel de metadata desde el primer punto de entrada habilitado
    Then el panel de metadata se despliega correctamente desde el primer punto de entrada
    When cierro el panel e invoco nuevamente el panel desde cada uno de los demas puntos de entrada habilitados
    Then el panel de metadata se despliega correctamente desde cada punto de entrada habilitado mostrando la misma metadata del evento
    When comparo el contenido y comportamiento del panel de metadata desplegado desde los distintos puntos de entrada
    Then el panel presenta contenido y comportamiento consistentes independientemente del punto de entrada utilizado
