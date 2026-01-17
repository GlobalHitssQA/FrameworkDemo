Feature: Responsive Portrait View for Contract Value and Composition Component

  Scenario: Verify component displays and functions correctly in Responsive Portrait mode
    Given the user is authenticated in Acticenter system
    And the browser is configured in Responsive Portrait mode
    When the user accesses the Acticenter system
    Then the system loads correctly in Responsive Portrait view
    When the user selects a contract to view
    Then the value and composition component is displayed adapted to Portrait view
    And the search function with magnifying glass icon is available
    When the user clicks on the component to expand the breakdown
    Then the popup with breakdown details displays correctly adapted to Portrait view
    And all breakdown items are accessible via scroll if necessary
    And the breakdown list maintains correct vertical alignment with the total value component