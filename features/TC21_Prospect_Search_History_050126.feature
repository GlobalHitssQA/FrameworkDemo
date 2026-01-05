Feature: Prospect Search History
  As an advisor
  I want to view my last 5 searches in chronological order
  So that I can quickly access my recent search criteria

  Scenario: Verify search history displays last 5 searches in chronological order
    Given the advisor is on the prospect search screen in Acticenter
    When the advisor starts typing in the search field
    Then the system displays the last 5 searches performed
    And the searches are ordered chronologically with the most recent first
    When the advisor performs a new search with different criteria
    And the advisor returns to the search field and begins typing
    Then the search history updates with the most recent search at the top
    And only the last 5 searches are displayed
    And the search history persists throughout the user session