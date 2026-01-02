Feature: Prospect Search by Email Key

  Scenario: Search prospect by electronic email key and verify results
    Given the advisor is logged into Acticenter
    When the advisor navigates to the prospect search field
    And the advisor types at least 2 characters from a known prospect email key
    Then the search results should display prospects matching the entered email key
    And the matching characters should be highlighted in the email key
    And each result should show the prospect name and electronic email key