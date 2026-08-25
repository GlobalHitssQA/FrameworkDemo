Feature: Panel de metadata en el player de TV con derecho de reproduccion
  Como usuario con sesion activa en la aplicacion de TV
  quiero visualizar el nuevo panel de metadata al acceder a un evento en vivo
  con derecho de reproduccion, para consultar la informacion del evento.

  Background:
    Given un usuario con sesion activa en la aplicacion de TV
    And el nuevo panel de metadata esta desplegado en el ambiente de prueba

  @PruebaGeneradaIA @QC-CP001
  Scenario: Visualizar el panel de metadata al reproducir un evento en vivo con derecho
    Given existe un evento en vivo con derecho de reproduccion disponible para el usuario
    When el usuario accede al evento en vivo con derecho de reproduccion desde el player de TV
    Then el player de TV inicia la reproduccion del evento en vivo sin errores
    And el nuevo panel de metadata se visualiza sobre el player conforme al insumo definido
    And la metadata mostrada corresponde con la informacion del evento en vivo y es legible
    And la reproduccion del evento en vivo continua sin interrupciones mientras el panel esta visible
