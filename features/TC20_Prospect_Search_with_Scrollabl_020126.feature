Feature: Prospect Search with Scrollable Results

  Scenario: Verify scrollable prospect search results display more than 5 matches
    Given the advisor is authenticated and on the Acticenter dashboard
    And the prospect search field is available
    When the advisor enters a search query that returns more than 5 prospects
    And the advisor executes the search
    Then the first 5 matching prospects are displayed with highlighted characters
    And a scroll option is available for additional results
    When the advisor scrolls down to view more results
    Then additional prospects beyond the initial 5 are displayed
    And all scrolled results maintain consistent formatting with name and email