Feature: Contract selection after search
  As an advisor
  I want to select a contract after performing a search
  So that I can visualize or operate on the selected contract

  Scenario: Advisor selects a contract from search results to visualize and operate
    Given the user is authenticated in Acticenter
    And the client has multiple active contracts
    When the user clicks on the search magnifying glass icon
    Then the system displays the client general screen with available contracts
    When the user views the list of contracts associated with the client
    Then the system shows all client contracts on the general screen
    When the user selects a specific contract from the list
    Then the system loads the selected contract and displays the value and composition component
    And the component presents the total value and allows access to the breakdown of the selected contract
    And the system enables operation or consultation functions according to user permissions and contract type