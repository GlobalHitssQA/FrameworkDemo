Feature: Contract breakdown component behavior for zero MXN cash balance

  Scenario: Verify breakdown component displays zero value for MXN cash when contract has no MXN cash balance
    Given the user is authenticated in the system
    And a contract without MXN cash balance exists
    When the user selects a contract without MXN cash balance
    Then the system loads the contract correctly
    When the user clicks on the total contract value component
    Then the breakdown popup is displayed with contract value details
    When the user locates the MXN cash item in the breakdown list
    Then the MXN cash item displays a value of zero pesos
    And the other applicable items display their corresponding monetary values
    And items without balance display zero pesos