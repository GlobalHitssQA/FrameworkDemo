Feature: Puntos de acceso al panel de metadata del Player de TV
  Como usuario de la aplicación de TV con derecho de reproducción
  Quiero acceder al panel de metadata desde cada punto de entrada listado
  Para verificar que el panel se visualiza de forma consistente

  Background:
    Given el usuario cuenta con sesión iniciada en la aplicación de TV
    And existe un evento en vivo con derecho de reproducción
    And están habilitados los puntos de entrada listados que conducen al Player de TV

  @PruebaGeneradaIA @QC-CP002
  Scenario Outline: Visualización del panel de metadata desde cada punto de entrada
    When accedo al evento en vivo con derecho de reproducción desde el punto de entrada "<punto_de_entrada>"
    Then el Player de TV se abre y el panel de metadata se visualiza correctamente desde ese punto de entrada
    And el panel de metadata mantiene la misma estructura, datos y comportamiento independientemente del punto de entrada

    Examples:
      | punto_de_entrada         |
      | primer punto de entrada  |
      | segundo punto de entrada |
      | tercer punto de entrada  |
