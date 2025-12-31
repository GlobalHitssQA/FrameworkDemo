Feature: GitHub Profile Metrics Dashboard Validation

  As a user of the GitHub Profile Finder
  I want to see the main profile metrics displayed prominently
  So that I can quickly understand the user's GitHub activity

  Scenario: Validate profile metrics dashboard displays accurate values
    Given the user accesses the GitHub profile finder component
    When the user enters a valid GitHub username with known metrics in the search field
    And the user clicks the search button and waits for profile to load
    Then the total repositories count should be displayed prominently on the dashboard
    And the total followers count should be displayed prominently on the dashboard
    And the total following count should be displayed prominently on the dashboard
    And the total gists count should be displayed prominently on the dashboard
    And all displayed metrics should match the values from the GitHub API