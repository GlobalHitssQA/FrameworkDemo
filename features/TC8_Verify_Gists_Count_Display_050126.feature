Feature: Verify Gists Count Display

  Scenario: Validate that the Gists metric displays the correct count for a GitHub user profile
    Given I navigate to the GitHub Profile Finder application
    When I search for a valid GitHub user with known public gists
    Then the user profile information should be displayed successfully
    And the Gists metric should be visible in the metrics dashboard
    And the Gists count should match the actual GitHub API data
    And the Gists metric should be clearly labeled and properly formatted