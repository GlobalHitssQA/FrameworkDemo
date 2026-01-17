Feature: Contract Valuation Date Display
  As a user of Acticenter
  I want to see the valuation date of the contract
  So that I can verify when the contract was last valued

  Scenario: Verify contract valuation date is displayed correctly
    Given I am authenticated in Acticenter with valid advisor credentials
    When I select an active contract to view its value and composition
    Then the valuation date should be visible in the total value component
    And the valuation date should be displayed in a valid format
    And the valuation date should match the expected system date