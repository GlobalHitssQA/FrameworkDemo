Feature: Contract Total Value Pop-up Display
  As an authenticated user in Acticenter
  I want to click on the contract total value component
  So that I can see the detailed breakdown of all applicable items

  Background:
    Given the user is authenticated in Acticenter
    And a contract is previously selected

  Scenario: Display pop-up with item breakdown when clicking on total value component
    Given the contract total value component is visible on the main screen
    When the user clicks on the contract total value component
    Then a pop-up is displayed with the detailed breakdown of all applicable items
    And each item shows its monetary value on the right side