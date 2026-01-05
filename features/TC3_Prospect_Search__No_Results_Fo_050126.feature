Feature: Prospect Search - No Results Found

  Scenario: Search for a non-existent prospect in Salesforce database
    Given the advisor is logged into Acticenter
    When the advisor navigates to the prospect search section
    And the advisor enters a non-existent prospect search query
    And the advisor executes the search
    Then a no results message should be displayed