Feature: Verify GitHub user profile metrics accuracy

  Scenario: Validate that displayed metrics match official GitHub API data
    Given I have obtained the expected metrics for user "torvalds" from the GitHub API
    And the GitHub Profile Search application is accessible
    When I enter the username "torvalds" in the search input field
    And I click the search button
    Then the user profile should be displayed
    And the Repos counter should match the expected value from the API
    And the Followers counter should match the expected value from the API
    And the Following counter should match the expected value from the API
    And the Gists counter should match the expected value from the API