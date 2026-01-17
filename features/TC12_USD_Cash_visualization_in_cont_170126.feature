Feature: USD Cash visualization in contract value breakdown

  Scenario: Verify USD Cash item is displayed in value breakdown for Casa de Bolsa Individual contract
    Given the user is authenticated in Acticenter module
    When the user selects a Casa de Bolsa Individual contract
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the USD Cash item is visible in the breakdown
    And the USD Cash item displays the amount in US dollars corresponding to the Casa de Bolsa contract