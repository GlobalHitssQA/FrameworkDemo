Feature: Perspectives Screen Title Validation
  As an authenticated banking advisor
  I want to see the perspectives screen title correctly displayed
  So that I can confirm I am on the correct module

  Scenario: Verify perspectives screen title is displayed correctly
    Given the user is authenticated as a Banking Advisor
    And the user has access to the perspectives module
    When the user navigates to the perspectives screen
    Then the perspectives screen loads successfully
    And the title is visible at the top of the screen
    And the title corresponds to the client perspectives functionality