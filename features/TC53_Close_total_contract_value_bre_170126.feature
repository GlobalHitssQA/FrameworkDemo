Feature: Close total contract value breakdown by clicking outside

  Scenario: User closes the total contract value breakdown by clicking outside the component in Desktop view
    Given the user is authenticated and viewing Acticenter in Desktop mode
    And a valid contract is selected
    When the user clicks on the total contract value component to display the breakdown
    Then the system displays the total contract value breakdown with all applicable items
    When the user clicks outside the breakdown component
    Then the breakdown closes and only the total contract value component is displayed