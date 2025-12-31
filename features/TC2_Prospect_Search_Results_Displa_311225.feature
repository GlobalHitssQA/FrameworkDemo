Feature: Prospect Search Results Display and Scroll Functionality

  Background:
    Given the user is logged in as an advisor
    And the Salesforce database contains more than 5 prospects matching the search criteria

  Scenario: Validate that system displays only first 5 prospects with scroll functionality for additional results
    Given the user is on the prospect search screen in Acticenter
    And the search field is available
    When the user enters a search term that returns more than 5 matching prospects
    Then the search is executed and returns multiple matching results
    And the system displays only the first 5 matching prospects on the screen
    And a scroll mechanism is available to view additional prospects
    When the user scrolls down to view additional prospects
    Then additional matching prospects are displayed as the user scrolls down