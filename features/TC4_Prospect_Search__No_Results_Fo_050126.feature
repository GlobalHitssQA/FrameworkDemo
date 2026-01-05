Feature: Prospect Search - No Results Found

  Scenario: Search for non-existing prospect in Salesforce database
    Given the advisor is logged into Acticenter
    When the advisor navigates to the prospect search field
    And the advisor enters search criteria that does not match any existing prospect
    Then a message indicating no results found is displayed
    And the dashboard remains accessible without errors