Feature: Prospect Search Functionality

  Scenario: Search for prospects with minimum two characters
    Given the advisor is logged into Acticenter
    And the advisor is on the dashboard
    When the advisor navigates to the prospect search field
    And the advisor types one character in the search field
    Then the search should not be triggered
    When the advisor types a second character in the search field
    Then the search should be triggered automatically
    And the search results should be displayed matching the input