Feature: GitHub Profile Search Error Handling

  Background:
    Given the user is on the GitHub profile search page

  Scenario: Display error message when searching for a non-existent user
    Given the search component is displayed with input field and search button
    When the user enters a non-existent username "xyznonexistentuser12345abc"
    And the user clicks the search button
    Then the system should display an error message indicating user not found
    And the profile metrics section should not display any data
    And the profile information section should remain empty