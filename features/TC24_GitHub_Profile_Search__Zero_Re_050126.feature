Feature: GitHub Profile Search - Zero Repositories User

  Scenario: Verify profile display for user with zero public repositories
    Given the GitHub profile search component is displayed
    When I enter a GitHub username with zero public repositories
    And I click the search button
    Then the Repos metric should display zero
    And all other profile data should load correctly