Feature: Prospect Search in Acticenter

  Scenario: Advisor searches for prospects in the same cell or financial center
    Given the advisor is logged in to Acticenter
    And the advisor has prospects in the same cell or financial center
    When the advisor navigates to the prospect search section
    Then the prospect search section should be displayed
    And the prospect search field should be visible and enabled
    And the search icon should be visible and enabled
    When the advisor performs a search for prospects in the same cell or financial center
    Then the system should display the prospect list from Salesforce database
    And the prospects should be from the same cell or financial center