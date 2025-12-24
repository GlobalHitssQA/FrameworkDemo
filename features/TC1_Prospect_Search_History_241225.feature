Feature: Prospect Search History
  As an advisor from Private Banking, Wealth Management or Patrimonial Banking
  I want to view my last 5 prospect searches when I start typing in the search field
  So that I can quickly access previously searched prospects

  Background:
    Given the advisor has performed at least one previous prospect search
    And the advisor is authenticated in Acticenter
    And the system stores the advisor's search history

  Scenario: Display last 5 prospect searches when starting to type in search field
    Given the advisor is logged in to Acticenter as a Private Banking advisor
    When the advisor accesses the prospect search functionality
    And the advisor clicks on the search field or starts typing a character
    Then the system automatically displays the last 5 searches performed by the advisor
    And each history record shows the prospect name and email address
    When the advisor selects one of the prospects from the displayed history
    Then the system loads the selected prospect information
    And the advisor can continue with the process