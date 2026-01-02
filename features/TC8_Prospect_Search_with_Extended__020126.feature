Feature: Prospect Search with Extended Character Input

  Scenario: Verify search field accepts and processes extended character input without truncation
    Given the advisor has navigated to the Acticenter dashboard
    When the advisor accesses the prospect search functionality
    And the advisor types a very long text exceeding typical maximum character limits in the search field
    And the advisor clicks the search button to execute the search
    Then the search executes successfully without truncation
    And the search results are displayed based on the entered criteria or a no results message appears