Feature: Verify GitHub API Request Limit Indicator

  Scenario: User searches for a GitHub profile and verifies the request limit indicator format
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username in the search input field
    And the user clicks the search button to query the GitHub profile
    Then the profile data is retrieved and displayed on screen
    And the request limit indicator is visible on the interface
    And the request limit indicator displays in the correct format showing current and total requests