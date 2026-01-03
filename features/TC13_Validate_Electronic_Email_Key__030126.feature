Feature: Validate Electronic Email Key Display in Prospect Search
  As an advisor
  I want to search for prospects and view their electronic email keys
  So that I can verify prospect contact information from Salesforce

  Scenario: Verify electronic email key is displayed for prospects with registered email
    Given I am logged into Acticenter with valid advisor credentials
    When I access the prospect search screen
    And I enter at least 2 characters in the search field
    And I execute the search
    Then the search returns matching prospects
    And each prospect entry displays the electronic email key field
    And the electronic email key is visible and complete for prospects with this information in Salesforce
    And prospects without email keys are handled according to system specifications