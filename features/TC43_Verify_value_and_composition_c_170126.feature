Feature: Verify value and composition component in Responsive Portrait view for Patrimonial Banking contracts

  Scenario: User views and interacts with value and composition component in Portrait mode
    Given the user is logged in as a Patrimonial Banking user
    And the browser is configured in Responsive Portrait mode
    When the user selects an active contract
    Then the value and composition component is displayed adapted to Portrait view
    And the component shows the total contract value
    When the user clicks on the component to expand the breakdown
    Then the breakdown popup is displayed with all items adapted to Portrait view
    And the breakdown list maintains correct vertical alignment
    When the user clicks outside the component
    Then the breakdown closes and returns to normal view