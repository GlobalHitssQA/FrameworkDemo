Feature: Contract Valuation Service Error Handling
  As a user of Acticenter
  I want to see appropriate error messages when the valuation service fails
  So that I can understand the system status and continue using other features

  Scenario: System handles valuation service unavailability gracefully
    Given the valuation service is unavailable
    And I am authenticated in Acticenter
    When I select a contract from Bank or Brokerage House
    Then the system should display an appropriate error message for valuation failure
    And I should be able to continue navigating other modules in Acticenter