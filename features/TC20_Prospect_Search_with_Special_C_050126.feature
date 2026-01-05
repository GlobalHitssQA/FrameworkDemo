Feature: Prospect Search with Special Characters

  Scenario: Search for prospects using special characters in name field
    Given the user is on the prospect search section
    When the user enters a prospect name containing special characters
    And the user executes the search
    Then the search results should display prospects with special characters in the name field
    And the matching special characters should be highlighted in yellow
    And the search field should accept alphanumeric chains with special characters