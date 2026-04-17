@PruebaGeneradaIA @OTAPAS-1625
Feature: OTAPAS-1625 - Validar dato Rentabilidad último año en Pitchbook BCO para clientes PF

  Scenario: Validar que se muestre el dato Rentabilidad último año en los contratos BCO de clientes PF al generar Pitchbook
    Given ingreso a la pantalla de Pitchbook
    When busco un cliente PF
    And genero pitchbook con portafolio de contrato BCO
    Then se genera el dato "Rentabilidad en el último año" en el pdf de pitchbook de contrato BCO
