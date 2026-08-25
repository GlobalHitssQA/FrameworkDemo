Feature: Manejo de respuestas del servicio de metadata en el Player de TV
  Como Player de TV integrado con el servicio de backend de metadata
  Quiero controlar respuestas incompletas, vacías o con error del backend
  Para mantener la estabilidad del player y del panel de metadata

  Background:
    Given el Player de TV está integrado con el servicio de backend de metadata
    And existe un evento en vivo con derecho de reproducción
    And es posible simular respuestas del backend de metadata

  @PruebaGeneradaIA @QA-CP005
  Scenario: Respuesta de metadata con campos incompletos
    When simulo una respuesta del backend de metadata con campos vacíos o ausentes para el evento en vivo
    Then el Player de TV procesa la respuesta parcial sin fallos ni cierres inesperados
    And el panel muestra los campos disponibles y gestiona los campos ausentes sin mostrar valores nulos crudos

  @PruebaGeneradaIA @QA-CP005
  Scenario: Respuesta de metadata sin datos (payload vacío)
    When simulo una respuesta del backend de metadata sin datos para el evento en vivo
    Then el Player de TV controla la ausencia total de metadata sin errores no controlados
    And el Player de TV mantiene la reproducción del evento

  @PruebaGeneradaIA @QA-CP005
  Scenario: Respuesta de error del backend de metadata durante la reproducción
    When simulo una respuesta de error del backend de metadata con código distinto de 200 durante la reproducción
    Then el Player de TV gestiona el error de forma controlada y no despliega datos inválidos
    And el Player de TV conserva la estabilidad del player
