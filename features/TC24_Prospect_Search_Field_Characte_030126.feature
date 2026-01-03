Feature: Prospect Search Field Character Limit Validation

  Scenario: Verify prospect search field accepts alphanumeric strings without character limit
    Given the advisor has accessed the Acticenter dashboard
    And the prospect search input field is displayed
    When the advisor enters an alphanumeric string of 2 characters
    Then the search executes and returns matching results
    When the advisor continues typing to create a string of 50 or more characters
    Then the search field accepts all characters without truncation
    And the search processes the full string and returns matching results from Salesforce
    And no maximum character limit is imposed on the search field