Feature: Search bar visualization on perspectives screen

  Scenario: Verify search bar is displayed and functional on perspectives screen
    Given the user is authenticated as a Patrimonial Banking Advisor
    When the user navigates to the perspectives screen
    Then the perspectives screen should load correctly
    And the search bar should be visible on the screen
    And the search bar should accept alphanumeric text input