Feature: Verify Following Count Display

  Scenario: Validate Following count matches GitHub API data
    Given the user navigates to the GitHub profile finder application
    When the user searches for a valid GitHub username with known following count
    Then the Following metric should be visible in the dashboard
    And the Following count should match the GitHub API response
    And the Following label should be clearly displayed and identifiable