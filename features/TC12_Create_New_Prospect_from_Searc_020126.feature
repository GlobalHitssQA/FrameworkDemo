Feature: Create New Prospect from Search
  As an advisor
  I want to create a new prospect when search results do not match my requirements
  So that I can add prospects that are not currently in the system

  Scenario: Navigate to new prospect creation from search results
    Given I am logged into the Acticenter dashboard as an advisor
    When I access the prospect search functionality
    And I perform a prospect search
    And I identify that no suitable prospect exists in the search results
    And I access the option to create a new prospect
    Then the system navigates to the new prospect creation interface