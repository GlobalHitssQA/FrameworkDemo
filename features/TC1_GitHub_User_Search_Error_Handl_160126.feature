Feature: GitHub User Search Error Handling
  As a user of the GitHub profile search component
  I want to see an appropriate error message when searching for a non-existent user
  So that I understand the user was not found

  Scenario: Search for a non-existent GitHub user displays error message
    Given I am on the GitHub search page
    When I enter a non-existent username "usuarioinexistente999xyz" in the search field
    And I submit the search
    And I filter results by users
    Then I should see a message indicating no users were found
    And I should see zero results displayed
    And no profile information should be visible