Feature: Monetary Values Decimal Format Validation
  As a user of the Acticenter system
  I want to verify that all monetary values display with correct decimal format
  So that I can read financial information accurately

  Scenario: Verify monetary values use period as decimal separator
    Given I am authenticated and accessing a contract with monetary values
    When I view the contract value and composition component
    And I click on the component to display the breakdown popup
    Then all monetary values should use period as decimal separator
    And values with zero decimals should display with two decimal places