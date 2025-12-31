Feature: Search Non-Existent GitHub User

  Scenario: Validate error handling when searching for a non-existent user
    Given the user is on the GitHub profile search component
    When the user enters a non-existent username "usuarioInexistente123456789xyz" in the search field
    And the user clicks the search button
    And the system waits for the API response
    Then the system should display a friendly error message indicating user not found
    And the dashboard should not display any user data or metrics
    And the search field should remain available for a new search