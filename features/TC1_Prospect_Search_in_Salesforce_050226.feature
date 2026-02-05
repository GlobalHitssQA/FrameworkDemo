Feature: Prospect Search in Salesforce

  Scenario: Search for a prospect by name in the advisor platform
    Given the user is on the advisor dashboard
    When the user enters a prospect name in the search field
    And the user clicks the search button
    Then a list of matching prospects should be displayed
    And the user should be able to scroll through the matches