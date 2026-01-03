Feature: Prospect Search History
  As an advisor user
  I want to see my last 5 searches as suggestions
  So that I can quickly access my recent prospect searches

  Scenario: Display last 5 prospect searches as suggestions
    Given the advisor user is logged into Acticenter
    And the advisor has performed 5 different prospect searches
    When the advisor navigates to the prospect search field
    And the advisor clicks on the search field
    Then the system displays the last 5 searches as suggestions
    And each suggestion shows the prospect name and email