Feature: Prospect Search Results Highlighting
  As an advisor
  I want to see matching characters highlighted in prospect search results
  So that I can quickly identify relevant prospects

  Scenario: Verify search term highlighting in prospect names and emails
    Given the advisor is on the prospect search screen
    When the advisor enters at least 2 characters in the search field
    And the advisor executes the search
    Then the system displays up to 5 matching prospects
    And matching characters in prospect names are highlighted
    And matching characters in email addresses are highlighted
    When the advisor enters a different search term
    Then the highlighting updates to reflect the new search characters