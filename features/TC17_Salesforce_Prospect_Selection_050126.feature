Feature: Salesforce Prospect Selection
  As an advisor
  I want to search and select a prospect from Salesforce
  So that I can continue with the process selection flow

  Scenario: Successfully select a Salesforce prospect and navigate to process selection
    Given I am logged into Acticenter as an advisor
    When I enter a prospect name in the search field
    And I click the search button
    Then the search results are displayed
    When I select a Salesforce prospect from the results list
    Then the system navigates to the process selection screen
    And the selected prospect information is carried forward