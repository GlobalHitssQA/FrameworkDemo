Feature: Contract Value Popup Display
  As a user of Acticenter
  I want to see the detailed breakdown of contract value
  So that I can understand the composition of my contract

  Scenario: Display popup with contract value breakdown when clicking on total value component
    Given the user is authenticated in Acticenter with an active contract selected
    And the total contract value component is visible on the screen
    When the user clicks on the total contract value component
    Then a popup with the contract value breakdown should be displayed
    And the popup should show all applicable items with their monetary values aligned to the right
    And the popup should be vertically aligned with the total contract value component