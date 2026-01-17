Feature: SAP Prenotes Integration for Bank Contract Cash in Transit

  Scenario: Verify cash in transit is displayed for Bank contracts using SAP prenotes service
    Given I am authenticated in Acticenter with an active Bank contract
    When I select a Bank contract that has cash in transit
    Then the system loads the selected contract
    When I expand the contract value breakdown
    Then the system invokes the SAP prenotes service to obtain cash in transit
    And I verify the Cash in Transit field in the breakdown
    Then the system displays the cash in transit value obtained from SAP prenotes service
    When I select a Casa de Bolsa contract
    Then the Cash in Transit field should not be visible for Casa de Bolsa contracts