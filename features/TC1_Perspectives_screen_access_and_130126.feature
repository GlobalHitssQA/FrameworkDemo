Feature: Perspectives screen access and visualization for Patrimonial Banking Advisor

  Scenario: Verify Patrimonial Banking Advisor can access and view perspectives screen with available options
    Given the user is logged in as a Patrimonial Banking Advisor
    When the user navigates to the client and prospect perspectives option
    Then the perspectives screen title should be displayed correctly
    And the prospect search field should be visible
    And the side menu should display the sections for Patrimonial Banking
    And the side menu should not display restricted sections