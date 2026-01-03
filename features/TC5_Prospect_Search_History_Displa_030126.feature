Feature: Prospect Search History Display

  Scenario: Verify that last 5 prospect searches are displayed as suggestions
    Given the Wealth Management Advisor is logged into Acticenter
    When the advisor navigates to the prospect search section
    And the advisor performs 5 or more different prospect searches
    And the advisor clicks on the search input field
    And the advisor starts typing any character in the search field
    Then the last 5 searches performed should be displayed as suggestions
    And each suggestion should display the prospect name and email address