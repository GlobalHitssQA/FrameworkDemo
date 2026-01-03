Feature: Prospect Search in Acticenter
  As an advisor
  I want to search for prospects in Salesforce
  So that I can find and manage potential clients

  Scenario: Search for prospects using the magnifying glass icon
    Given I am on the prospect search screen in Acticenter
    When I enter valid search criteria with more than 2 characters
    And I click the magnifying glass search icon
    Then the search results should be displayed
    And matching prospects should appear in the results list or a no results message should be shown