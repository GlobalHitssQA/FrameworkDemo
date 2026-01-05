Feature: Verify Web Link Field When Not Available

  Scenario: Verify web link field displays correctly when user has no web link
    Given the user navigates to the GitHub profile search component
    When the user enters a GitHub username that has no web link in their profile
    And the user clicks the search button to retrieve the profile
    And the user navigates to the left section showing user details
    Then the web link field should display either empty or show 'Not available' message