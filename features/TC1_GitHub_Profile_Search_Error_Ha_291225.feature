Feature: GitHub Profile Search Error Handling

  As a user of the GitHub Profile Finder application
  I want to see a friendly error message when searching for a non-existent user
  So that I understand the search result and can try again with a valid username

  Scenario: Display error message when searching for a non-existent GitHub user
    Given the GitHub Profile Finder component is open
    And the search input field and search button are visible
    When I enter a non-existent username "usuario12345NoExiste9999" in the search field
    And I click on the search button
    Then the system should display an error message indicating the user was not found
    And the error message should be user-friendly and clear
    And no profile information or metrics should be displayed