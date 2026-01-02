Feature: Prospect Search with Multiple Results and Highlighting

  Scenario: Search for prospects with multiple matches and verify highlighting and scroll functionality
    Given the advisor is logged into Acticenter with prospect search access
    When the advisor enters a search term that matches multiple prospects
    And the advisor executes the search
    Then the search results should display with matching characters highlighted in bold
    And the first 5 matching results should be presented on the screen
    And the scroll functionality should be available when more than 5 results exist