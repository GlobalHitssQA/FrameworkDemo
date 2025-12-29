Feature: GitHub User Search Error Handling
  As a user of the GitHub profile search component
  I want to see a friendly error message when searching for a non-existent user
  So that I understand the user was not found without confusion

  Scenario: Display error message when searching for a non-existent GitHub user
    Given the GitHub profile search component is displayed
    And the search input field is empty and the search button is enabled
    When I enter a non-existent GitHub username "thisuserdoesnotexist12345xyz" in the search input
    And I click the search button to execute the query
    Then a user-friendly error message should be displayed indicating the user does not exist
    And no profile information or metrics should be displayed
    And the dashboard section should remain empty or hidden
    And the followers list should remain empty or hidden