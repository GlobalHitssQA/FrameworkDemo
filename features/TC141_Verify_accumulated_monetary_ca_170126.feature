Feature: Verify accumulated monetary calculation for Variable Income Funds in contract value breakdown

  Scenario: Validate Variable Income Funds accumulated monetary value in contract breakdown
    Given the user is authenticated in Acticenter with valid patrimonial banking credentials
    When the user selects a contract containing variable income fund investments
    And the user clicks on the total contract value component to display the breakdown
    Then the Variable Income Funds section should display the correct accumulated monetary value aligned to the right