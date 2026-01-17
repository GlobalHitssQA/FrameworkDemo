Feature: Responsive Landscape View for Contract Value and Composition Component

  Scenario: Verify component displays and functions correctly in Responsive Landscape mode
    Given the user is authenticated in Acticenter system
    And the browser is configured in Responsive Landscape mode
    When the user accesses the Acticenter system
    Then the system loads correctly in Responsive Landscape view
    When the user selects a contract to view
    Then the value and composition component is displayed adapted to Responsive Landscape view
    When the user verifies the search function with magnifying glass icon
    Then the search function is available and displays the general client screen when pressed
    When the user clicks on the component to expand the breakdown
    Then the popup with breakdown displays correctly adapted to Landscape view
    And all breakdown items are visible and legible
    And all items are correctly formatted in Landscape view
    When the user clicks outside the expanded component
    Then the breakdown closes correctly