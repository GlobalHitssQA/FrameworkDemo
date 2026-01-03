Feature: Prospect Search Character Validation
  As an advisor
  I want to search for prospects using alphanumeric characters
  So that I can find prospects efficiently with dynamic search updates

  Scenario: Validate prospect search accepts alphanumeric input with minimum 2 characters and no maximum limit
    Given I access the Acticenter dashboard
    And the prospect search field is visible and accessible
    When I type a single character in the search field
    Then the character is accepted but search does not trigger
    When I type exactly 2 characters in the search field
    Then the search triggers automatically
    And the results are displayed with proper Look and Feel formatting
    When I continue typing additional alphanumeric characters
    Then the search updates dynamically with each character
    And the proper Look and Feel is maintained
    When I type a long alphanumeric string without reaching any limit
    Then the field accepts unlimited alphanumeric characters
    And the search continues to function properly