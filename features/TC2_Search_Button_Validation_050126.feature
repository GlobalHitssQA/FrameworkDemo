Feature: Search Button Validation

  Scenario: Verify search button displays magnifying glass icon and is clickable
    Given the user navigates to the GitHub profile search component
    When the user locates the search button next to the text input field
    Then the search button should display a magnifying glass icon
    And the search button should be enabled and clickable