Feature: Cash in Transit visibility for Casa de Bolsa contracts

  Scenario: Verify that Cash in Transit item is not displayed in valuation breakdown for Casa de Bolsa contract type
    Given the user is authenticated in Acticenter with Patrimonial, Private or Wealth Management banking permissions
    When the user selects a Casa de Bolsa contract from the contract selector
    And the user clicks on the Total Contract Value component to expand the breakdown
    Then the Cash in Transit item should not be displayed in the breakdown list