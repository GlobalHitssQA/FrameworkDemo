Feature: Validate account numbers for dollarized funds purchase
  As a Persona Moral user
  I want to validate the account numbers displayed for dollarized funds
  So that I can verify the MXN and USD liquidation accounts are correctly shown

  @PruebaGeneradaIA
  Scenario Outline: Validate MXN and USD account numbers for dollarized fund
    Given Im logged in as "Wealth Management"
    When I open the purchase form
    And I search for a dollarized fund "<FundName>"
    And I select the fund "<FundName>"
    Then I should see the MXN and USD account numbers displayed below the fund
    And the account numbers should be displayed with correct format

    Examples:
      | FundName |
      | ACTOTAL  |
      | ACTICOB  |
      | DINAMO   |
