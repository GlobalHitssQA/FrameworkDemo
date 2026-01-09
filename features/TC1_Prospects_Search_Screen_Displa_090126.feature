Feature: Prospects Search Screen Display Validation

  Scenario: Verify prospects search screen displays correctly with all elements
    Given the user is authenticated as a Banca Patrimonial, Privada or Wealth Management advisor
    And the user has access to the Perspectiva Act (Pitch Book) module
    When the user navigates to the prospects search screen
    Then the search screen should display the title
    And the search screen should display the search field
    And the search screen should display the lateral menu with available options
    And the central container should display the instructions message
    And the central container should display the instructions image