Feature: Prospect Search with Two Characters

  Scenario: Advisor searches for prospects using exactly two characters and then more characters
    Given the advisor is logged into Acticenter
    When the advisor navigates to the prospect search field
    And the advisor types exactly 2 characters in the search field
    And the advisor clicks the search icon
    Then the system displays prospect search results matching the 2-character input
    When the advisor clears the search field
    And the advisor types more than 2 characters in the search field
    And the advisor clicks the search icon
    Then the system displays prospect search results corresponding to the entered characters