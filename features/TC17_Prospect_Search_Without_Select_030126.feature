Feature: Prospect Search Without Selection
  As a user of the Acticenter platform
  I want to search for prospects and exit without selecting
  So that I can return to the dashboard without retaining any prospect data

  Scenario: Search prospects and exit without making a selection
    Given I am on the Acticenter dashboard
    When I access the prospect search screen
    Then the search screen should load correctly with search input field visible
    When I perform a valid search that returns multiple prospect matches
    Then the system should display a list of matching prospects with relevant information
    When I review the search results without selecting any prospect
    Then the search results should remain displayed with no prospect selected or highlighted
    When I exit the search without making a selection
    Then the system should return me to the main dashboard screen
    And I should be able to select other functions
    And no prospect data should be retained or processed
    And the dashboard should display in its initial state