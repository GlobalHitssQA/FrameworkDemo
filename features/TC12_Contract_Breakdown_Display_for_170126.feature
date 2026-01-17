Feature: Contract Breakdown Display for Bank Individual Contracts

  Scenario: Verify Cash MXN appears correctly in breakdown for Bank Individual contracts
    Given the user is authenticated in Acticenter
    When the user selects a Bank Individual contract from the contract selector
    Then the system displays the total contract value component
    When the user clicks on the total contract value component
    Then a popup with the contract value breakdown is displayed
    And the Cash MXN item is visible in the breakdown list with its monetary value
    And the Purchasing Power MXN item is not visible in the breakdown