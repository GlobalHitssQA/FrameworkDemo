Feature: Prospect Search - No Results Handling

  Scenario: Search for non-existing prospect and access new prospect creation
    Given the advisor is logged into Acticenter
    And the advisor navigates to the prospect search interface
    When the advisor enters search criteria that returns no matching prospects
    Then the system displays a message indicating no results found
    And the system remains on the dashboard screen
    And the system displays an option to create a new prospect
    When the advisor clicks on the new prospect creation option
    Then the system navigates to the new prospect creation screen