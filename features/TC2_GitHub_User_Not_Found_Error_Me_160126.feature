Feature: GitHub User Not Found Error Message
  As a user of the GitHub profile search component
  I want to see a friendly error message when searching for a non-existent user
  So that I understand the user was not found

  Scenario: Display error message when searching for non-existent GitHub user
    Given I am on the GitHub search page
    And the search input and search button are visible
    When I enter a non-existent username "usuarioquenoexiste12345xyz" in the search field
    And I click the search button
    And I filter results by users
    Then I should see a message indicating no users were found
    And I should not see any user profile data