Feature: Panel de Metadata en el Player de TV
  Como usuario de la app de TV
  Quiero visualizar el nuevo panel de Metadata en el Player de TV
  Para consultar la informacion de los eventos en vivo segun mi derecho de reproduccion

  Background:
    Given que el usuario cuenta con sesion iniciada en la app de TV
    And el player de TV tiene integrado el nuevo panel de Metadata

  @PruebaGeneradaIA @TC001
  Scenario: Visualizar panel de metadata al acceder a un evento en vivo con derecho de reproduccion
    Given que existe un evento en vivo disponible en el catalogo
    And el usuario posee derecho de reproduccion sobre el evento en vivo
    When selecciona en el catalogo el evento en vivo con derecho de reproduccion
    Then la app de TV registra la seleccion del evento en vivo y muestra el foco sobre el elemento seleccionado
    When presiona el control OK/Play para iniciar la reproduccion del evento en vivo
    Then el player de TV inicia la reproduccion del stream en vivo sin errores de carga y muestra la imagen del evento
    When observa el player de TV una vez iniciada la reproduccion del evento en vivo
    Then el panel de Metadata se despliega sobre el player de TV en la posicion y formato del diseno Figma Large Focus
    And el panel de Metadata muestra los campos poblados con la informacion del evento en vivo consistente con la provista por el backend

  @PruebaGeneradaIA @TC003
  Scenario: El panel de metadata no se despliega al acceder a un evento en vivo sin derecho de reproduccion
    Given que existe un evento en vivo sin derecho de reproduccion para el usuario
    And el usuario NO posee derecho de reproduccion sobre el evento en vivo
    When selecciona en el catalogo el evento en vivo sin derecho de reproduccion
    Then la app de TV registra la seleccion del evento en vivo restringido
    When presiona el control OK/Play para intentar iniciar la reproduccion del evento en vivo sin derecho
    Then el player de TV bloquea la reproduccion y muestra el estado de restriccion por falta de derecho de reproduccion sin iniciar el stream
    When observa la pantalla del player de TV tras el intento de reproduccion del evento sin derecho
    Then el panel de Metadata NO se despliega en el player de TV
    And el player de TV mantiene su funcionamiento previo sin regresiones ni bloqueos inesperados

  @PruebaGeneradaIA @TC005
  Scenario: Consistencia entre la metadata del panel del player de TV y los datos del backend
    Given que el usuario posee derecho de reproduccion sobre el evento en vivo
    And el backend expone la metadata del evento en vivo
    When inicia la reproduccion del evento en vivo con derecho de reproduccion en el player de TV
    Then el player de TV despliega el panel de Metadata con los campos del evento poblados
    When consulta en el backend la respuesta del servicio de metadata del mismo evento en vivo
    Then el backend retorna la metadata del evento con los campos y valores esperados en la estructura definida
    When compara campo por campo los valores mostrados en el panel de Metadata contra los valores retornados por el backend
    Then cada campo del panel de Metadata coincide exactamente con el valor provisto por el backend sin discrepancias ni transformaciones no definidas
    And cada llave definida en los insumos se muestra en su ubicacion correcta del panel consistente con la fuente del backend
