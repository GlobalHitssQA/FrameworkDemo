Feature: Access to Fund Operations Module
  As an advisor/banker user
  I want to access the Fund Operations module through the main menu
  So that I can manage investment fund operations

  Scenario: Validate access to Fund Operations module through Acticenter main menu
    Given the user is authenticated in Acticenter with advisor or banker credentials
    When the user navigates to the Commercial Management menu
    And the user selects the Fund Operations option
    Then the Fund Operations screen should be displayed correctly
    And all components should be active and functional