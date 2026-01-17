Feature: Verify hedge funds section displays zero when no investments exist

  Scenario: Hedge funds section shows zero value for contract without hedge fund investments
    Given the user is authenticated and on the contract consultation module
    When the user selects a contract without hedge fund investments
    Then the system displays the selected contract
    When the user clicks on the total contract value to expand the breakdown
    Then the popup opens showing all applicable sections for the contract
    When the user locates the hedge funds section in the breakdown
    Then the hedge funds section displays the monetary value "$0.00"
    And the hedge funds section format is consistent with other sections