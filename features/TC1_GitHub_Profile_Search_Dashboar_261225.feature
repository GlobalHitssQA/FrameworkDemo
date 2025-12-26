Feature: GitHub Profile Search Dashboard Metrics Validation

  Scenario: Validate user metrics dashboard displays correctly when searching for existing GitHub user
    Given the user accesses the GitHub profile search component
    And the search input and search button with magnifying glass icon are enabled
    When the user enters a valid existing GitHub username "octocat" in the search field
    And the user clicks the search button with magnifying glass icon
    Then the system displays a loading indicator while processing the request
    And the system successfully retrieves the user profile data from GitHub API
    And the metrics dashboard displays the Repos counter with numeric value
    And the metrics dashboard displays the Followers counter with numeric value
    And the metrics dashboard displays the Following counter with numeric value
    And the metrics dashboard displays the Gists counter with numeric value
    And the API requests indicator is visible with the consumed requests format