Feature: Prospect Search Character Validation
  As an advisor
  I want to search for prospects with minimum character requirements
  So that I can find relevant prospects efficiently

  Scenario: Validate minimum character requirement for prospect search
    Given the advisor is logged in to Acticenter
    And the advisor is on the prospect search page
    When the advisor types 1 character in the search field
    And the advisor clicks the search icon
    Then the search should not be triggered or system prompts for more characters
    When the advisor clears the search field
    And the advisor types 2 characters in the search field
    And the advisor clicks the search icon
    Then the search should not be triggered or system prompts for more characters
    When the advisor clears the search field
    And the advisor types 3 characters in the search field
    And the advisor clicks the search icon
    Then the search should be executed and results should be displayed
    When the advisor clears the search field
    And the advisor types 3 characters in the search field
    And the advisor presses the enter key
    Then the search should be executed and results should be displayed