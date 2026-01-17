Feature: Desktop View Component Visualization

  Scenario: Verify component displays correctly in Desktop view with all elements aligned
    Given the user is authenticated in Acticenter system
    And the browser is configured in standard Desktop resolution
    When the user accesses the Acticenter system in Desktop mode
    And the user selects a contract to visualize
    Then the value and composition component is displayed on screen
    And the header shows the client or contract search function
    When the user clicks on the component to expand the breakdown
    Then the breakdown popup is displayed correctly
    And the breakdown list is vertically aligned with the total value component
    And all elements are readable and correctly spaced