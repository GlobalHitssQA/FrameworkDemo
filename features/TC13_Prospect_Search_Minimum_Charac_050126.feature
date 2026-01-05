Feature: Prospect Search Minimum Character Validation

  Scenario: Verify search is triggered only after entering 2 characters
    Given the advisor is logged into Acticenter
    And the advisor navigates to the prospect search section
    When the advisor enters 1 character in the search field
    Then no search results should be displayed
    And no loading indicators should appear
    When the advisor enters a second character in the search field
    Then the search should be triggered
    And matching prospects or a no results message should be displayed