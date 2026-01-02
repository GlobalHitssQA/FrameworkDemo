Feature: Prospect Search Results Display

  Scenario: Verify prospect name and email are displayed in search results
    Given the advisor is logged into Acticenter
    When the advisor navigates to the prospect search field
    And the advisor types at least 2 characters in the search field
    Then the search results are displayed
    And each search result displays the prospect name
    And each search result displays the electronic email key
    And both prospect name and electronic email key are clearly visible and readable