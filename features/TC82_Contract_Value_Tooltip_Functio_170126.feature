Feature: Contract Value Tooltip Functionality
  As an authenticated user in Acticenter
  I want to see a tooltip when hovering over the contract value component
  So that I can understand the distribution of the contract value

  Scenario: Verify tooltip displays correct information about contract value distribution
    Given the user is authenticated in Acticenter with a selected contract
    And the total contract value component is visible on the screen
    When the user hovers over the information icon of the contract value component
    Then a tooltip should be displayed with explanatory text about the component function
    And the tooltip should contain clear information about viewing the value distribution
    When the user moves the cursor away from the component
    Then the tooltip should disappear automatically