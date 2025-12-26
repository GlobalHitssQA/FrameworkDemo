Feature: GitHub Profile Search Metrics Validation

  Scenario: Validate metrics display for an existing GitHub user
    Given the user is on the GitHub profile search page
    And the search input field and search button with magnifying glass icon are visible
    When the user enters a valid existing GitHub username in the search field
    And the user clicks the search button with magnifying glass icon
    Then the system processes the GitHub API request
    And the Repos counter is displayed with a numeric value
    And the Followers counter is displayed with a numeric value
    And the Following counter is displayed with a numeric value
    And the Gists counter is displayed with a numeric value
    And all metric values are accurate and match the GitHub API data