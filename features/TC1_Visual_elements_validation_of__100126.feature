Feature: Visual elements validation of customer and prospects perspectives main screen

  Scenario: Validate visual elements on perspectives screen as a Patrimonial Banking Advisor
    Given the user is logged in as a Patrimonial Banking Advisor
    When the user navigates to the customer and prospects perspectives screen
    Then the perspectives screen should be loaded
    And the screen title should be visible at the top
    And the screen title should be correctly labeled