Feature: Verify No Unintended Navigation Without Prospect Selection

  Scenario: Advisor searches for prospect but does not select any result
    Given the advisor is logged into Acticenter
    And the advisor has access to the dashboard
    When the advisor enters a prospect name in the search field
    And the advisor executes the search
    Then the search results are displayed
    And the advisor reviews the results without selecting any prospect
    And the system remains on the dashboard screen
    And no process selection screen is opened
    And no prospect detail screen is opened