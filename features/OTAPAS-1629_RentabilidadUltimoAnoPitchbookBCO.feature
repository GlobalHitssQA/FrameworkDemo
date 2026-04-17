@PruebaGeneradaIA @OTAPAS-1629
Feature: OTAPAS-1004_WM-PM-BCO: Dato "Rentabilidad último año" en Pitchbook

  Scenario: Validar que se muestre el dato "Rentabilidad último año" en los contratos BCO de clientes PM al generar Pitchbook
    Given el usuario ingresa a la pantalla de Pitchbook
    Then se muestra la pantalla de generacion de Pitchbook
    When el usuario busca un cliente PM
    Then se muestran resultados de PM
    When el usuario genera pitchbook con portafolio de contrato BCO
    Then se genera el dato "Rentabilidad en el último año" en el pdf de pitchbook de contrato BCO
