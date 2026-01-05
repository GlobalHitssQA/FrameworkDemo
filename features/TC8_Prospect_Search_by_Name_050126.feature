Feature: Prospect Search by Name

  Scenario: Search for a prospect using their name in Acticenter
    Given the advisor has accessed the Acticenter dashboard
    When the advisor locates the prospect search field
    And the advisor enters a valid prospect name in the search field
    And the advisor triggers the search action
    Then the search results should be displayed filtered by the prospect name