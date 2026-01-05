Feature: Verify GitHub User with Zero Following

  Scenario: Display profile information for a user following zero accounts
    Given the GitHub profile search component is accessible
    When I enter a GitHub username that follows 0 other users
    And I click the search button
    Then the Following metric should display 0
    And all other user profile information should display correctly