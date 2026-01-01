Feature: Search button with magnifying glass icon functionality

  Scenario: Verify search button with magnifying glass icon triggers profile search
    Given the user accesses the GitHub profile search application
    And the search component is visible on the page
    When the user locates the search button next to the text input field
    Then the search button should be visible and positioned appropriately
    And the search button should display a magnifying glass icon
    When the user enters a valid GitHub username in the search input field
    And the user clicks the search button with the magnifying glass icon
    Then the search should be triggered and profile query initiated
    And the user profile information should be displayed correctly