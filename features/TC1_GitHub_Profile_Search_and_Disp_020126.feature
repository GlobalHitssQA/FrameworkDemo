Feature: GitHub Profile Search and Display

  Scenario: Verify complete user profile information is displayed after successful search
    Given the user navigates to the GitHub profile search component
    Then the search component is displayed with text input field and search button
    When the user enters a valid GitHub username "octocat" in the search input field
    And the user clicks the search button
    Then the system retrieves the profile information from GitHub API
    And the user avatar is displayed in the profile section
    And the full name and username are displayed correctly
    And the biography section displays the user description or not available message
    And the location and company fields are displayed correctly
    And the personal website link is displayed or shows not available
    And the Follow button is present and functional