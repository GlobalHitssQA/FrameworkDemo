Feature: GitHub User Search Error Handling
  As a user of the GitHub Profile Search application
  I want to see a friendly error message when searching for a non-existent user
  So that I understand why no profile information is displayed

  Background:
    Given the GitHub API is available
    And the user has access to the search component

  Scenario: Search for a non-existent GitHub user displays error message
    Given I am on the GitHub Profile Search page
    When I enter an invalid username "usuarioinexistente12345xyz" in the search field
    And I click the search button
    Then the system should query the GitHub API
    And I should see an error message indicating the user was not found
    And no profile information should be displayed
    And no metrics should be displayed for Repos
    And no metrics should be displayed for Followers
    And no metrics should be displayed for Following
    And no metrics should be displayed for Gists