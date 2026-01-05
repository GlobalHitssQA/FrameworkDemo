Feature: Prospect Search with Scroll Functionality

  Scenario: Verify scroll mechanism displays additional prospects beyond first 5 results
    Given the advisor has accessed the Acticenter dashboard
    When the advisor enters search criteria that returns more than 5 prospect matches
    And the advisor executes the search
    Then the first 5 results are displayed on screen
    And a scroll mechanism is available in the results area
    When the advisor scrolls down in the results area
    Then additional prospect results beyond the 5th entry are displayed
    And the 6th and subsequent results are accessible through scrolling