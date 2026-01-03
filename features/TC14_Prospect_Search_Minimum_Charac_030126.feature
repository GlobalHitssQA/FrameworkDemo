Feature: Prospect Search Minimum Character Validation
  As a user of Acticenter
  I want to search for prospects with a minimum of 3 characters
  So that the system only triggers searches with sufficient criteria

  Scenario: Search requires minimum 3 characters to trigger
    Given I am on the prospect search screen in Acticenter
    When I enter exactly 2 characters in the search field
    Then the system should accept the input without triggering the search
    When I enter a third character to reach 3 characters minimum
    Then the system should automatically trigger the search
    And the search results should be displayed or a no results message should appear