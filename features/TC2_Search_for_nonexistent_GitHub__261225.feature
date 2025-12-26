Feature: Search for non-existent GitHub user

  Scenario: Validate error message when searching for a non-existent user
    Given the user is on the GitHub search page
    And the search input and search button are enabled
    When the user enters a non-existent username "usuarioInexistente123456789XYZ" in the search field
    And the user clicks the search button
    Then the system should display a loading indicator while processing
    And the system should detect that the user was not found
    And a friendly error message should be displayed indicating no users were found
    And the user profile metrics and details sections should not be visible