Feature: Prospect Search Field Character Validation

  Scenario: Validate that prospect search field accepts only alphanumeric characters
    Given the advisor is logged in to Acticenter
    When the advisor navigates to the prospect search field
    And the advisor attempts to type alphabetic characters in the search field
    Then the system should accept alphabetic characters
    When the advisor attempts to type numeric characters in the search field
    Then the system should accept numeric characters
    When the advisor attempts to type special characters in the search field
    Then the system should reject or filter out special characters
    And only alphanumeric characters should remain in the search field