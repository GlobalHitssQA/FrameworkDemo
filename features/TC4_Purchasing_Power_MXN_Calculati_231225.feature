Feature: Purchasing Power MXN Calculation Validation for Brokerage House Contracts
  As an advisor user
  I want to validate that the Purchasing Power MXN value matches the currentCash value
  So that I can ensure accurate financial information is displayed for Brokerage House contracts

  Scenario: Validate Purchasing Power MXN calculation using currentCash value for Brokerage House contracts
    Given the advisor user is authenticated in Acticenter with wealth management profile
    And a Brokerage House contract is available with balance in currentCash
    And the Advisor module is correctly displaying the currentCash value
    And integration with Acticenter services is working
    When the user selects a Brokerage House contract from the Advisor module
    Then the Brokerage House contract loads correctly in Acticenter
    When the user verifies the currentCash value displayed in the Advisor module for the selected contract
    Then the Advisor module shows the currentCash value correctly
    When the user clicks on the total valuation component of the contract to open the breakdown
    Then a pop-up with detailed contract value breakdown is displayed
    When the user locates the Purchasing Power MXN item in the breakdown
    Then the Purchasing Power MXN item appears in the breakdown list
    And the value shown in Purchasing Power MXN exactly matches the currentCash value from the Advisor module
    And the monetary value is displayed on the right side of the item name
    When the user verifies this item only appears for Brokerage House contracts and not for Bank contracts
    Then the Purchasing Power MXN item is exclusive to Brokerage House contracts and does not appear in Bank type contracts