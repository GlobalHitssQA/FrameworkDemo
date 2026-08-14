# language: en
Feature: Paginacion de la Galeria sin duplicados ni saltos durante el scroll
  Como usuario autenticado de la app iOS de Claro Drive
  quiero que la paginacion cargue nuevos lotes de imagenes sin duplicados ni saltos en la secuencia
  para asegurar la continuidad cronologica en una cuenta de mas de 10,000 imagenes

  Background:
    Given el usuario esta autenticado en la app iOS de Claro Drive
    And la app esta actualizada con la optimizacion de CDIS-10000
    And la cuenta de prueba tiene mas de 10000 imagenes indexadas en orden cronologico
    And el dispositivo cuenta con conexion estable a la red

  @PruebaGeneradaIA @TC007
  Scenario: La paginacion carga nuevos lotes sin duplicados ni saltos durante el scroll
    When abro la seccion Fotos y observo la carga del primer lote de imagenes
    Then el primer lote de imagenes se carga y muestra correctamente en la cuadricula
    When realizo scroll hacia abajo de forma controlada para disparar la carga incremental del siguiente lote
    Then la paginacion carga un nuevo lote de imagenes de forma fluida al alcanzar el umbral de scroll
    When inspecciono la secuencia de imagenes cargadas entre lotes consecutivos
    Then no se presentan imagenes duplicadas entre lotes ni dentro del mismo lote
    When verifico la continuidad de la secuencia cronologica al pasar de un lote al siguiente
    Then no existen saltos ni discontinuidades y las imagenes mantienen el orden esperado
