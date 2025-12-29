Feature: Search for non-existent GitHub user

  Scenario: Validate error message is displayed when searching for a non-existent user
    Given the user opens the GitHub profile search component
    And the search input and search button are displayed
    When the user enters a non-existent username "usuario12345NoExiste9999" in the search input
    And the user clicks the search button
    Then the system should display an error message indicating the user was not found
    And the error message should be user-friendly and clear