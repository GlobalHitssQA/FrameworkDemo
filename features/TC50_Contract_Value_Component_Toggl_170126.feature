Feature: Contract Value Component Toggle Functionality
  As a user viewing contracts in Acticenter Desktop
  I want to be able to open and close the contract breakdown component
  So that I can view detailed information when needed

  Scenario: Verify breakdown opens and closes correctly when clicking on component in Desktop view
    Given the user is authenticated in Acticenter and viewing a contract in Desktop mode
    When the user views the contract value component
    Then the component should be displayed in closed state showing only total value
    When the user clicks on the contract value component
    Then the breakdown popup should display with all applicable monetary items
    And all items should show their monetary values on the right side
    When the user clicks outside the expanded component
    Then the breakdown should close and return to initial state
    When the user clicks on the component again
    Then the breakdown popup should display correctly again