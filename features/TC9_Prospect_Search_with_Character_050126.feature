Feature: Prospect Search with Character Highlighting
  As an advisor
  I want to search for prospects in Acticenter
  So that I can see matching results with highlighted characters

  Scenario: Search prospect and verify character highlighting in results
    Given I am logged in to the Acticenter dashboard as an advisor
    When I enter at least 2 characters in the prospect search field
    And I review the displayed coincidence list
    Then a list of matching prospects should be displayed
    And the matching characters should be highlighted in the prospect names