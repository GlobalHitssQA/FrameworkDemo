Feature: Search for a valid GitHub user profile

  Scenario: Successfully search and display a valid GitHub user profile
    Given the user navigates to the GitHub Profile Search component
    Then the search component is displayed with a text input field and a search button with magnifying glass icon
    When the user enters a valid existing GitHub username "octocat" in the search input field
    Then the username "octocat" is displayed correctly in the input field
    When the user clicks the search button with the magnifying glass icon
    Then the system initiates a search request to the GitHub API
    And the user profile information is successfully retrieved and displayed on the screen
    Then the dashboard metrics are visible and contain the user data
    And the user information section is visible and contains the user data
    And the followers list is visible and contains the user data