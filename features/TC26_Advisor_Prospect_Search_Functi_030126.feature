Feature: Advisor Prospect Search Functionality

  Scenario: Search prospects from Salesforce database with email validation and search history
    Given the advisor user is logged into Acticenter dashboard
    And the search field is accessible
    When the advisor enters a search term with at least 2 characters
    Then the search query is sent to Salesforce database
    And the search is performed within the advisor's assigned prospect list
    And the results include prospect name and electronic email from Salesforce
    And prospects without electronic email are not presented in results
    And the last 5 searches are displayed when typing begins