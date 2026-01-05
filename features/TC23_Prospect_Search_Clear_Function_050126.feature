Feature: Prospect Search Clear Functionality
  As an advisor
  I want to clear prospect search results
  So that I can return to the dashboard and start a new search

  Scenario: Clear search results and validate no automatic selection
    Given I am on the Acticenter dashboard
    When I navigate to prospect search functionality
    And I enter "Jo" in the search field
    And I click the search button
    Then search results should be displayed on screen
    When I clear the search field completely
    Then the search field should be empty
    And the search results should be removed from screen
    And I should be on the dashboard where I can select new prospect function
    When I do not select any element from previous search results
    Then the system should remain on dashboard without proceeding to any process