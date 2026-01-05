Feature: Verify GitHub User Repository Count

  Scenario: Validate that the repository count is accurate and clearly displayed
    Given I navigate to the GitHub search page
    When I search for a valid GitHub user "torvalds"
    And I navigate to the user profile page
    Then the repository counter should be visible in the profile navigation
    And the repository count should be accurate and match the actual public repositories
    And the repository metric should be clearly labeled as "Repositories"