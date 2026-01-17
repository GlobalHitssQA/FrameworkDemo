Feature: Verify hedge funds label in contract value breakdown

  Scenario: Verify the hedge funds label displays correctly in the contract value breakdown
    Given the user is authenticated in the Acticenter module
    When the user selects a contract with hedge fund investments
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the hedge funds label should display as "Fondos de cobertura"