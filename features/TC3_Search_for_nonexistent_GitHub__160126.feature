Feature: Search for non-existent GitHub user
  As a user of the GitHub profile search application
  I want to search for a user that does not exist
  So that I can see a friendly error message indicating the user was not found

  Scenario: Search for a non-existent GitHub user displays error message
    Given I am on the GitHub search page
    When I enter a non-existent username "usuarioquenoexiste123xyz" in the search field
    And I click the search button
    Then the system should attempt to query the GitHub API
    And I should see a friendly message indicating no users were found