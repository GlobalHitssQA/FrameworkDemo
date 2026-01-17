Feature: Contract value and composition component visibility

  Scenario: Verify that the contract value and composition component is displayed only after selecting a valid contract
    Given the user is authenticated and accesses Acticenter without selecting any contract
    Then the main Acticenter screen is displayed
    And the contract value and composition component is not visible
    When the user searches for a client using the search magnifying glass
    And the user selects a client from the search results
    Then the client general screen BP is displayed
    When the user selects a specific contract from the client
    Then the selected contract is loaded
    And the contract value and composition component is visible
    And the component displays the total contract value and the breakdown option