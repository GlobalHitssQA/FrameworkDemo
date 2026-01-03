Feature: Prospect Search Results Display

  Scenario: Verify that exactly 5 prospect results are displayed initially with complete information
    Given the Bank Advisor is logged into Acticenter
    And the Advisor navigates to the prospect search screen
    When the Advisor enters a search term that returns more than 5 results
    And the Advisor observes the initially displayed results without scrolling
    Then exactly 5 prospect coincidences are displayed on the screen
    And each of the 5 results shows the prospect name
    And each of the 5 results shows the electronic email