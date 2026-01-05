Feature: Prospect Search History
  As an advisor
  I want to view my recent prospect searches
  So that I can quickly access previously searched prospects

  Scenario: Display last 5 prospect searches in dropdown
    Given the advisor is logged in to Acticenter
    When the advisor performs 5 different prospect searches
    And the advisor navigates back to the prospect search field
    And the advisor clicks on the prospect search field
    Then the system displays a dropdown with the last 5 searches
    And each search entry shows the prospect name and email