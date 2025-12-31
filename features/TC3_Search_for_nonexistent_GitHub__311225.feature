Feature: Search for non-existent GitHub user

  Scenario: Validate error message when searching for a non-existent GitHub user
    Given the user is on the GitHub profile search application
    When the user enters an invalid username "usuarioquenoexiste12345xyz" in the search field
    And the user clicks the search button
    Then the system should display a user-friendly error message
    And the profile dashboard should remain empty or in initial state
    And the search field should allow a new search without page reload