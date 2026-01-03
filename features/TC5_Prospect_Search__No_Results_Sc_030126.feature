Feature: Prospect Search - No Results Scenario

  Scenario: Search for a prospect with no matching results in Salesforce
    Given the advisor user is logged into Acticenter
    And the dashboard is displayed
    When the advisor navigates to the prospect search functionality
    And the search field is displayed
    And the advisor enters search criteria that returns no results from Salesforce
    And the advisor executes the search by clicking the search icon
    Then the system queries the Salesforce database
    And a no results message is displayed to the user
    And the message indicates that no prospects were found matching the search criteria