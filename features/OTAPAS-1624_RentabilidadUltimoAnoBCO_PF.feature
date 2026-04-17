@PruebaGeneradaIA @OTAPAS-1624
Feature: OTAPAS-1004_WM-PF-BCO: Dato "Rentabilidad último año" en la pantalla de clientes

  Scenario: Validar que se muestre el dato "Rentabilidad último año" en los contratos BCO de clientes PF
    Given el usuario ingresa a la pantalla de clientes de PF
    Then se muestra el listado de contratos de la PF
    When el usuario selecciona un contrato de BCO de PF
    Then se muestra el dato de Rentabilidad del ultimo ano en la pantalla de PF
