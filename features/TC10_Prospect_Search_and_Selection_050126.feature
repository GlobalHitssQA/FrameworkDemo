Feature: Prospect Search and Selection

  Scenario: Verify prospect information display and selection capability
    Given the advisor has accessed the Acticenter dashboard
    When the advisor enters a prospect name in the search field
    And the advisor executes the search
    Then the search results are displayed
    And each prospect entry shows the prospect name and electronic email
    And the advisor can distinguish between different prospects
    And the prospect entry is selectable