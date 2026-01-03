Feature: Prospect Search Results Scrolling

  Scenario: Verify scroll functionality displays all prospect results beyond the initial five
    Given the user has accessed Acticenter and navigated to the prospect search screen
    When the user performs a search that returns more than 5 prospect matches
    Then the system displays the first 5 results on screen
    And a scroll mechanism is available for navigating through results
    When the user scrolls down through the results list
    Then additional results beyond the fifth are displayed
    And the sixth and subsequent results display prospect name and email
    And all matching prospects are accessible through scrolling