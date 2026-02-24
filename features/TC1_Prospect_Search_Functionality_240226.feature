Feature: Prospect Search Functionality
  As a Patrimonial, Private or Wealth Management advisor
  I want to search for prospects in the system
  So that I can find client information quickly

  Scenario: Search for prospects with minimum character requirement
    Given I am authenticated as an advisor in Acticenter dashboard
    When I click on the prospect search field
    Then I should see the last 5 searches with prospect name and email
    When I enter exactly 2 characters in the search field
    Then the system should not execute the search and show no results
    When I enter a third character to complete 3 characters
    Then the system should automatically execute the search
    And I should see the first 5 matching prospects with name and email highlighted