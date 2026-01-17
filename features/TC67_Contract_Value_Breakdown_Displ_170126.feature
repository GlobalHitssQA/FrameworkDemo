Feature: Contract Value Breakdown Display
  As a user of Acticenter
  I want to see the breakdown of contract value
  So that I can verify the Pending Settlement section name

  Scenario: Verify Pending Settlement section name in contract value breakdown
    Given the user is authenticated in Acticenter
    When the user selects a contract from Bank or Brokerage House
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the user locates the Pending Settlement section in the breakdown list
    Then the section name displays as Pendientes por liquidar according to Look and Feel specifications