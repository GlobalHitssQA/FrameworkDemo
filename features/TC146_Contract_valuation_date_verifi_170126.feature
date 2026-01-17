Feature: Contract valuation date verification
  As an authenticated user
  I want to verify that the valuation date shown in the component matches the current system date
  So that I can trust the data is up to date

  Scenario: Verify valuation date matches current system date across multiple contracts
    Given I am authenticated in Acticenter
    And I can see the current system date displayed in the interface
    When I select a contract to view its value and composition
    Then the total value component should be displayed
    And the valuation date should match the current system date
    When I select a different contract
    Then the valuation date should also match the current system date