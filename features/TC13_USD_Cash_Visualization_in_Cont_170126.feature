Feature: USD Cash Visualization in Contract Value Breakdown for Casa de Bolsa Persona Moral

  Scenario: Verify USD Cash item is displayed in contract value breakdown for Casa de Bolsa Persona Moral contract
    Given the user is authenticated in Acticenter module
    When the user selects a Casa de Bolsa Persona Moral contract
    Then the system loads the contract information and displays the total value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the USD Cash item is visible in the breakdown
    And the USD Cash item displays the amount in US dollars corresponding to the Casa de Bolsa contract