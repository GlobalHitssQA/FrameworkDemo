@PruebaGeneradaIA @OTAPAS-1626
Feature: OTAPAS-1004_WM-PF-CB: Dato "Rentabilidad último año" en la pantalla de clientes

  Scenario: Validar rentabilidad último año en contratos CB de clientes PF
    Given el usuario ingresa a la pantalla de clientes de PF
    Then se muestra el listado de contratos de la PF
    When el usuario selecciona un contrato de CB de PF
    Then se muestra el dato de Rentabilidad del último año en la pantalla de PF
