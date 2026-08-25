Feature: Consistencia del panel de metadata del player de TV entre puntos de entrada
  Como usuario con sesion activa en la aplicacion de TV
  quiero que el panel de metadata se muestre de forma consistente
  al acceder al mismo evento en vivo desde cada punto de entrada listado,
  para asegurar una experiencia homogenea.

  Background:
    Given un usuario con sesion activa en la aplicacion de TV
    And el nuevo panel de metadata esta desplegado en el ambiente de prueba

  # La comparacion entre puntos de entrada se realiza dentro de un unico escenario,
  # tomando como referencia (baseline) el descriptor capturado en el primer punto de
  # entrada y comparando contra el los puntos de entrada restantes. No se usa Scenario
  # Outline para no depender de estado entre Worlds independientes.
  @PruebaGeneradaIA @QC-CP002
  Scenario: El panel de metadata es consistente entre todos los puntos de entrada listados
    Given existe un evento en vivo con derecho de reproduccion disponible para el usuario
    And los puntos de entrada al player definidos en el requerimiento estan habilitados
    When el usuario accede al evento en vivo desde cada punto de entrada listado
    Then el panel de metadata se visualiza correctamente en cada punto de entrada
    And el panel de metadata mantiene identidad de campos, controles, estructura, estados y orden entre los puntos de entrada
