Feature: Prospect Search in Acticenter
  As an advisor
  I want to search for prospects in Salesforce
  So that I can quickly find and view prospect information

  Scenario: Search prospect by name or email with Enter key
    Given I am logged in as a Private Banking advisor on the Acticenter dashboard
    When I locate the prospect search field in the active prospect list
    And I enter a valid prospect name or email with more than 2 characters
    And I press the Enter key
    Then the search results should be displayed showing the first 5 matching prospects
    And each result should display the prospect name and email
    And the displayed results should match the search criteria
    And matching characters in prospect names should be highlighted