@PruebaGeneradaIA @OTAPAS-1628
Feature: OTAPAS-1004_WM-PM-BCO: Dato "Rentabilidad último año" en la pantalla de clientes

  Scenario: Validar que se muestre el dato "Rentabilidad último año" en los contratos BCO de clientes PM
    Given el usuario ingresa a la pantalla de clientes de PM
    Then se muestra el listado de contratos de la PM
    When el usuario selecciona un contrato de BCO
    Then se muestra el dato de Rentabilidad del ultimo ano en la pantalla
