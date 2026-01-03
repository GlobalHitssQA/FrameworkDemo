Feature: Prospect Search Field Input Validation

  Scenario: Verify alphanumeric character input acceptance in prospect search field
    Given the advisor user is logged in to Acticenter
    When the advisor navigates to the prospect search field
    And the advisor types alphabetic characters "abc" in the search field
    Then the alphabetic characters should be displayed in the field
    When the advisor types numeric characters "123" in the search field
    Then the numeric characters should be displayed in the field
    When the advisor types alphanumeric characters "abc123" in the search field
    Then the alphanumeric characters should be displayed in the field
    And the system should accept all alphanumeric characters without validation errors