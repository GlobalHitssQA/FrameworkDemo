Feature: Validate account numbers in fund purchase for Legal Entity
  As a Legal Entity user (Persona Moral)
  I want to verify the account numbers displayed when purchasing dollarized funds
  So that I can confirm the MXN and USD settlement accounts are correctly shown

  @PruebaGeneradaIA
  Scenario Outline: Validate MXN and USD account numbers for dollarized fund purchase
    Given Im logged in as "Wealth Management"
    When I open the purchase widget
    Then I verify the purchase form is displayed
    When I search for a fund "<FundName>"
    And I select the fund "<FundName>"
    Then I should see the MXN and USD account numbers displayed
    And I should see the account number for MXN and USD with correct format

    Examples:
      | FundName |
      | ACTOTAL  |
      | ACTICOB  |
      | DINAMO   |
