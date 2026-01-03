Feature: Prospect Search Visual Highlighting
  As a user of Acticenter
  I want to search for prospects
  So that I can see matching characters highlighted in the results

  Scenario: Verify search results display with highlighted matching characters
    Given I am on the Acticenter prospect search screen
    When I enter "ab" in the search field
    Then the system initiates the search and displays results
    And I observe the coincidence list displayed on screen
    And the matching characters in prospect names are visually highlighted