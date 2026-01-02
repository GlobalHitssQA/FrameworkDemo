Feature: Follow GitHub User
  As a user of the GitHub profile search component
  I want to follow a GitHub user
  So that I can stay updated with their activity

  Scenario: Successfully follow a GitHub user from profile view
    Given I navigate to the GitHub profile search component
    When I enter a valid GitHub username and execute search
    And I locate the Follow button in the user details section
    And I click the Follow button
    Then the system redirects to GitHub external platform
    And the external GitHub page opens correctly for follow action