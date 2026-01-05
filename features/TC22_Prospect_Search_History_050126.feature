Feature: Prospect Search History
  As an advisor
  I want to view my recent prospect search history
  So that I can quickly access previously searched prospects

  Scenario: Verify search history displays last 5 searches with prospect details
    Given I am on the Acticenter prospect search page
    When I perform a first search for a prospect
    Then the search result should be displayed successfully
    And the search should be stored in history
    When I type initial characters in the search field
    Then the last 5 searches performed should be displayed
    When I perform additional searches to exceed 5 total searches
    Then only the most recent 5 searches should be retained
    And each history entry should display prospect name and electronic email
    When I view the search results
    Then the first 5 coincidences should be displayed on screen
    And a scroll option should be available if more than 6 results exist