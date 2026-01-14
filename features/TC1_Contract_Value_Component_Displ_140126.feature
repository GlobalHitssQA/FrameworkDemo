Feature: Contract Value Component Display for Individual Bank Customer

  Scenario: Validate contract value component displays correctly with detailed breakdown
    Given the user is logged into Acticenter with valid credentials
    When the user searches and selects an individual customer with an active bank contract
    And the user selects a specific bank contract from the available contracts
    Then the contract value component displays the total value in MXN with proper currency formatting
    When the user clicks on the contract value component to expand the breakdown
    Then the detailed breakdown popup is displayed
    And the breakdown shows Efectivo MXN field with the main account balance
    And the breakdown displays all applicable fields with their monetary values
    And fields not applicable to bank individual customers are not displayed
    And the breakdown list is vertically aligned with the contract value component
    When the user clicks outside the expanded breakdown component
    Then the breakdown closes and returns to the collapsed view