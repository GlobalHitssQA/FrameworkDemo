Feature: Prospect Search Without Selection

  Scenario: Advisor searches for prospects but does not select any
    Given the advisor is logged into Acticenter as a Bank Advisor
    And the dashboard is displayed with all available options
    When the advisor enters at least 2 characters in the prospect search field
    Then search results are displayed with matching prospects
    When the advisor reviews the list of search results without selecting any prospect
    Then the results remain visible on screen
    When the advisor clicks outside the search results area
    Then the system remains on the dashboard screen
    And the advisor is still on the same dashboard where they initiated the search
    And the dashboard state is preserved without navigation to any other screen