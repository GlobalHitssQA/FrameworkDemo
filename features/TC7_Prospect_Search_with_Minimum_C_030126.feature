Feature: Prospect Search with Minimum Character Trigger
  As an advisor user
  I want to search for prospects with a minimum of 3 characters
  So that the system retrieves relevant results from Salesforce

  Scenario: Search is triggered only after entering 3 characters
    Given the advisor user is logged into Acticenter
    And the advisor dashboard is displayed
    When the advisor navigates to the prospect search field
    And the advisor enters 1 character in the search field
    Then the search should not be triggered
    When the advisor enters a second character in the search field
    Then the search should not be triggered
    When the advisor enters a third character in the search field
    Then the search should be automatically triggered
    And the search results should be displayed
    And the results should contain prospects matching the search criteria