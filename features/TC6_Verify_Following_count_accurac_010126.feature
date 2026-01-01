Feature: Verify Following count accuracy in GitHub Profile Search

  Scenario: Following metric displays accurate count matching GitHub API data
    Given the user accesses the GitHub Profile Search component
    When the user enters a valid GitHub username with known following count
    And the user clicks the search button to retrieve profile data
    Then the dashboard section is displayed with user metrics
    And the Following count matches the actual GitHub API data