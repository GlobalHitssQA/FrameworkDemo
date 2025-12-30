Feature: Contract Value Breakdown Popup Behavior

  Scenario: Validating popup open and close behavior for contract value breakdown
    Given user is logged into Acticenter with valid credentials
    And a contract is loaded and displayed in the contract view
    And the contract value component is visible and interactive
    When user clicks on the contract value component
    Then the breakdown popup opens displaying all applicable contract value items
    And the breakdown list is vertically aligned with the contract value component
    When user clicks anywhere outside the contract value component and breakdown area
    Then the breakdown popup closes and returns to main contract view
    When user clicks on the contract value component again
    Then the breakdown popup opens again with all items displayed
    When user clicks on the contract value component while breakdown is open
    Then the breakdown popup toggles appropriately based on design specification
    When user navigates to Casa de Bolsa contract type
    And user clicks on the contract value component
    Then the breakdown popup toggle functionality works correctly
    When user navigates to Bank individual contract type
    And user clicks on the contract value component
    Then the breakdown popup toggle functionality works correctly
    When user navigates to Bank corporate contract type
    And user clicks on the contract value component
    Then the breakdown popup toggle functionality works correctly