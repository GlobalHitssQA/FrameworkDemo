Feature: Prospect Search Field State Management
  As an advisor
  I want the prospect search field to be cleared after selecting a prospect
  So that I can perform new searches without interference from previous data

  Scenario: Search field is cleared after prospect selection
    Given I am on the Acticenter prospect search interface
    And the search field is empty
    When I enter "Jo" in the search field
    Then the system displays up to 5 matching prospects
    When I select a prospect from the search results
    Then I am navigated to the process selection screen
    When I navigate back to the prospect search interface
    Then the search field is cleared and empty
    When I enter "Ma" in the search field
    Then the system performs a new search and displays matching results