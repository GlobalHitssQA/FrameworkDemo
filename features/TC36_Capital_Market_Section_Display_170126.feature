Feature: Capital Market Section Display in Contract Valuation Breakdown

  Scenario: Verify capital market section is displayed in valuation breakdown for contracts with capital market investments
    Given the user is authenticated in Acticenter with valid credentials
    And the main screen is displayed
    When the user selects a contract that contains capital market investments
    Then the system loads the selected contract information
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract value breakdown
    And the Capital Market section is visible in the breakdown list
    And the section name is aligned to the left and the monetary value is aligned to the right