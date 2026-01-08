Feature: Prospect Search Functionality
  As an advisor user
  I want to search for prospects in Salesforce
  So that I can find and view prospect information

  Scenario: Search for prospects returns and displays results correctly
    Given I am logged in as an advisor user with existing prospects
    And I am on the main dashboard
    When I navigate to the prospect search functionality
    Then the prospect search field should be displayed
    When I enter more than 2 characters in the search field
    Then the system should execute the search automatically
    And the system should display a list of matching prospects
    And each search result should show prospect name and email
    And matching characters should be highlighted in the results