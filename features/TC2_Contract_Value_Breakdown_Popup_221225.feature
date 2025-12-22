Feature: Contract Value Breakdown Pop-up Verification
  As an authenticated user in Acticenter
  I want to view the detailed breakdown of my contract value
  So that I can understand the composition of my total contract value

  Background:
    Given the user is authenticated in Acticenter
    And a contract has been previously selected
    And the contract valuation services are available

  Scenario: Display contract breakdown pop-up when clicking on contract value component
    Given the main component displays the total contract value
    When the user clicks on any part of the contract value component
    Then the system displays a pop-up with the detailed breakdown of the contract value composition
    And the pop-up shows all applicable items according to the selected contract type
    And each item displays its monetary value on the right side with correct format
    And the breakdown list is vertically aligned with the total contract value component
    And items without monetary value display $0.00