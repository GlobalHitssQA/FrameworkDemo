Feature: Prospect Search Functionality
  As an authorized advisor
  I want to search for prospects
  So that I can view only active prospects from Salesforce database

  Scenario: Verify prospect search displays only active prospects from Salesforce
    Given I am logged into Acticenter as an advisor with valid credentials
    When I navigate to the prospect search functionality in the dashboard
    And I enter a valid prospect name that exists in Salesforce with active status
    Then only active prospects from Salesforce database are displayed in the results
    And inactive or deleted prospects are not shown in the search results