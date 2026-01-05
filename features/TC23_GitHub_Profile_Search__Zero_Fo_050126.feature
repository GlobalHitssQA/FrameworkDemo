Feature: GitHub Profile Search - Zero Followers Verification

  Scenario: Verify profile display for user with zero followers
    Given the GitHub profile search component is loaded
    When I enter a valid GitHub username with zero followers
    And I click the search button
    Then the Followers metric should display zero
    And the followers list section should show empty state
    And the user profile information should display correctly