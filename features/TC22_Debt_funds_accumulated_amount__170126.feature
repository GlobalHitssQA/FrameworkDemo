Feature: Debt funds accumulated amount validation

  Scenario: Verify that the Debt Funds section displays the correct accumulated monetary amount
    Given the user is authenticated in Acticenter
    And there is an active contract with debt fund investments
    When the user accesses Acticenter and selects a contract with debt fund investments
    Then the system displays the total contract value component
    When the user retrieves the expected debt funds value from the backend service
    Then the accumulated value of debt fund investments is obtained
    When the user clicks on the component to display the contract value breakdown
    Then the system displays the popup with detailed breakdown
    When the user identifies the Debt Funds section in the breakdown list
    Then the Debt Funds section is displayed in the list
    And the amount shown in the Debt Funds section matches exactly the accumulated monetary value including thousands separator and decimals