Feature: Prospect Search Results Display
  As an authenticated advisor
  I want to search for prospects and view their information
  So that I can identify and select potential clients

  Scenario: Display prospect name in search results
    Given I am logged into Acticenter as an authenticated advisor
    And the main dashboard is accessible
    When I navigate to the prospect search functionality
    And I enter a valid search term with at least 2 characters
    And I trigger the search
    Then the system should process the search and return matching results
    And each prospect entry should clearly display the prospect name field
    And the prospect name should be visible and properly formatted for each result