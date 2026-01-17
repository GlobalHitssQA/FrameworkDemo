Feature: Verify equity funds accumulated monetary value in contract breakdown

  Scenario: Verify that equity funds section shows correct accumulated monetary value
    Given the user is authenticated in Acticenter
    And the user has selected a contract with equity fund investments
    When the user views the total contract value component
    And the user retrieves the expected equity funds value from the backend service
    And the user clicks on the contract value component to display the breakdown
    Then the breakdown popup is displayed
    And the equity funds section is visible in the breakdown list
    And the equity funds amount matches the expected accumulated value with correct thousand separator and decimal format