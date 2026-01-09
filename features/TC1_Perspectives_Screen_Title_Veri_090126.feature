Feature: Perspectives Screen Title Verification

  Scenario: Verify perspectives screen title is displayed correctly
    Given I am logged in as a Patrimonial Banking Advisor
    When I navigate to the client and prospect perspectives screen
    Then I should see the perspectives screen title displayed correctly