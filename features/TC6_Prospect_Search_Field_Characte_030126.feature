Feature: Prospect Search Field Character Validation
  As a Wealth Management Advisor
  I want to validate that the prospect search field only accepts alphanumeric characters
  So that the system prevents invalid special characters from being entered

  Scenario: Validate search field accepts only alphanumeric characters
    Given I am logged in to Acticenter as a Wealth Management Advisor
    When I navigate to the prospect search section
    Then the prospect search interface should be displayed
    When I enter alphabetic characters in the search field
    Then the alphabetic characters should be accepted and displayed
    When I enter numeric characters in the search field
    Then the numeric characters should be accepted and displayed
    When I attempt to enter special characters in the search field
    Then the special characters should be rejected and not displayed
    And only alphanumeric characters should be allowed in the search field