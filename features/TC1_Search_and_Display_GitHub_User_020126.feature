Feature: Search and Display GitHub User Profile

  Scenario: Successfully search for an existing GitHub user and display profile information
    Given the user is on the GitHub profile search component
    And the search interface displays a text input field and a search button with magnifying glass icon
    When the user enters a valid GitHub username "octocat" in the search input field
    And the user clicks the search button with the magnifying glass icon
    Then the system queries the GitHub API for the specified user
    And the user profile information is successfully retrieved and displayed
    And the avatar is visible on the profile section
    And the full name and username are displayed correctly
    And the biography is visible if available
    And the location and company information are displayed
    And the web link is visible if available
    And the Follow button is present on the profile