Feature: Mobile Portrait Layout for GitHub Profile Search

  Scenario: Verify mobile portrait responsive layout displays correctly
    Given the user opens the GitHub profile search application on mobile portrait viewport
    When the user enters a valid GitHub username in the search field
    And the user clicks the search button
    Then the profile information is displayed in a mobile-optimized layout
    And the layout displays sections in a vertical stacked arrangement
    And all UI elements are properly sized for mobile portrait viewing
    And all content is accessible through vertical scrolling without horizontal overflow
    And all interactive elements have adequate touch target sizes