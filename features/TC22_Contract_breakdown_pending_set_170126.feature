Feature: Contract breakdown pending settlements visualization for Casa de Bolsa

  Scenario: Verify the visualization and monetary accumulated of Pending Settlements item in contract value breakdown for Casa de Bolsa contracts
    Given the user is authenticated in Acticenter with Private Banking profile
    When the user selects a Casa de Bolsa contract with pending settlement operations
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the Pending Settlements item is visible in the breakdown list
    And the Pending Settlements item shows the correct monetary accumulated value on the right side