Feature: Player de TV - Panel de Metadata en evento en vivo desde múltiples puntos de entrada
  Como usuario autenticado con derecho de reproducción
  Quiero acceder a un evento en vivo desde distintos puntos de entrada
  Para verificar que el player y su panel de metadata se comportan de forma consistente

  Background:
    Given el usuario está autenticado en la aplicación de TV
    And el usuario cuenta con derecho de reproducción sobre el evento en vivo
    And existe un evento en vivo accesible desde los distintos puntos de entrada listados
    And el player de TV integra el nuevo diseño del panel de metadata

  @PruebaGeneradaIA @TC003
  Scenario Outline: Reproducción de evento en vivo y panel de metadata desde diferentes puntos de entrada
    When accede al evento en vivo desde el punto de entrada "<punto_entrada>" y ejecuta la reproducción
    Then el player de TV inicia la reproducción y muestra el panel de metadata correctamente
    When regresa y accede al mismo evento en vivo desde el punto de entrada alterno "<punto_entrada_alterno>" y ejecuta la reproducción
    Then el player de TV inicia la reproducción y muestra el panel de metadata correctamente desde el punto alterno
    When compara el contenido y la disposición del panel de metadata mostrado en cada punto de entrada
    Then el panel de metadata se muestra de forma idéntica e independiente del punto de entrada utilizado
    And la reproducción del evento en vivo se mantiene continua y estable sin errores ni cierres inesperados del player

    Examples:
      | punto_entrada | punto_entrada_alterno |
      | Home          | Grilla                |
      | Buscador      | Detalle del evento    |
