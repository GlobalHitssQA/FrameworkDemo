Feature: Contract Total Value Component Visualization
  As an advisor or banker
  I want to see the contract total value component
  So that I can view the total amount of the selected contract

  Scenario: Verify contract total value component is displayed on funds operation screen
    Given the user is authenticated in Acticenter as an advisor
    When the user selects a contract from the client or contract search
    Then the contract total value component should be visible on the main screen
    And the component should display the total contract amount