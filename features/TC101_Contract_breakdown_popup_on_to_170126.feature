Feature: Contract breakdown popup on touch devices
  As a user on a touch device
  I want to tap on the contract value component
  So that I can see the detailed breakdown popup

  Scenario: Open breakdown popup by tapping on contract value component
    Given the user is authenticated in Acticenter on a touch device
    And the user has an active contract selected
    When the user taps on the contract value component
    Then the breakdown popup should be displayed
    And the popup should show all applicable breakdown items
    And the breakdown items should be vertically aligned