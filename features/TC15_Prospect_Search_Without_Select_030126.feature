Feature: Prospect Search Without Selection

  Scenario: Verify system remains on dashboard when reviewing search results without selecting a prospect
    Given the advisor user is logged into the Acticenter dashboard
    When the advisor navigates to the prospect search functionality
    And the advisor enters a search term with at least 2 characters
    And the advisor reviews the search results without selecting any prospect
    Then the search results should remain visible on screen
    And the system should remain on the current dashboard