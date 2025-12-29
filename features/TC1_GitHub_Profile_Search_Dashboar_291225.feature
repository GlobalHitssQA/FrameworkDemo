Feature: GitHub Profile Search Dashboard Metrics Validation

  Scenario: Validate metrics display when searching for an existing GitHub user
    Given the user opens the GitHub profile search component
    And the search input and search button with magnifying glass icon are displayed
    When the user enters a valid GitHub username "octocat" in the search input
    And the user clicks on the search button with magnifying glass icon
    Then the system queries the GitHub API and processes the request
    And the dashboard displays the user metrics including Repos Followers Following and Gists
    And the numeric values of Repos Followers Following and Gists match the real GitHub profile data
    And the API requests limit indicator is updated and displayed