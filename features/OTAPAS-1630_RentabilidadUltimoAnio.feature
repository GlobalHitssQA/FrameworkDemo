@PruebaGeneradaIA @OTAPAS-1630
Feature: OTAPAS-1004_WM-PM-CB: Dato "Rentabilidad último año" en la pantalla de clientes

  Scenario: Validar rentabilidad último año en contratos CB de clientes PM
    Given el usuario ingresa a la pantalla de clientes de PM
    Then se muestra el listado de contratos de la PM
    When el usuario selecciona un contrato de CB
    Then se muestra el dato de Rentabilidad del último año en la pantalla
