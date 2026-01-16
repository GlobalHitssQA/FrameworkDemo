Feature: Search for non-existent GitHub user

  As a user of the GitHub Profile Finder application
  I want to see a friendly error message when searching for a non-existent user
  So that I understand the user was not found without seeing technical errors

  Scenario: Display error message when searching for a non-existent GitHub user
    Given I am on the GitHub Profile Finder application
    When I enter a non-existent username in the search field
    And I click the search button
    And I wait for the API response
    Then I should see a friendly error message indicating user not found
    And I should not see any profile information or metrics dashboard