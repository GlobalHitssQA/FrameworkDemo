Feature: Prospect Search - Name Display Validation

  Scenario: Verify prospect name is displayed in all search results
    Given the advisor is logged into Acticenter
    And the advisor is on the prospect search page
    When the advisor enters a valid prospect name in the search field
    And the advisor executes the search
    Then the search results are displayed
    And the prospect name field is visible in each search result entry