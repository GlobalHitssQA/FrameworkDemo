Feature: Prospect Search Functionality
  As an advisor user
  I want to search for prospects by entering more than 2 characters
  So that I can find matching prospects in Salesforce

  Scenario: Search for prospect using search icon with valid criteria
    Given I am logged in as a Patrimonial Banking advisor in Acticenter
    And I can see the advisor dashboard with prospect search functionality
    When I locate the prospect search field
    And I enter "Juan" in the search field
    And I click on the search icon
    Then I should see search results displaying matching prospects
    And the results should show prospect name and email key