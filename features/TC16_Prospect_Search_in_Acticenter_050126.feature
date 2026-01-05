Feature: Prospect Search in Acticenter

  Scenario: Search prospects with valid criteria and verify results display
    Given the advisor is on the prospect search screen in Acticenter
    When the advisor enters valid search criteria with more than 2 characters
    And the advisor clicks the search icon
    Then the system displays matching prospects with highlighted search terms
    And the first 5 coincidences are shown
    And the search only executes on icon click not while typing