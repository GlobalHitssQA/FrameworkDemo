Feature: Prospect Search Email Validation
  As an advisor user
  I want to search for prospects in Acticenter
  So that I can view only prospects with valid email keys from Salesforce

  Scenario: Search prospects and verify email key requirement
    Given I am logged into the Acticenter dashboard as an advisor user
    When I navigate to the prospect search functionality
    And I enter a search term with at least 2 characters
    And I perform the search
    Then the search results should be displayed from Salesforce database
    And each prospect result should display the electronic email key
    And prospects without email key should not be displayed in the results