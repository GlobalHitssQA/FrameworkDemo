Feature: Salesforce Prospect Search and Selection
  As an advisor
  I want to search for prospects in Salesforce
  So that I can select them and continue with the defined process flow

  Scenario: Successfully search and select a Salesforce prospect
    Given I am on the Acticenter dashboard as an advisor
    When I access the prospect search functionality
    And I enter search criteria for an existing Salesforce prospect
    And I click the search icon to execute the search
    Then search results display prospects from Salesforce database
    When I select a specific Salesforce prospect from the results
    Then the prospect is selected and highlighted
    And the system navigates to the process flow defined in AGAS-43
    And the process continues successfully without errors