Feature: Valuation date update verification
  As an authenticated user
  I want to verify that the valuation date updates when the system date changes
  So that I can ensure the component displays current information

  Scenario: Verify valuation date updates correctly when system date changes
    Given I am authenticated in Acticenter
    And I select an active contract
    And the contract component displays the current valuation date
    When I record the initial valuation date shown in the component
    And I simulate a system date change
    And I refresh the contract view
    Then the valuation date should be updated to the new system date
    And the valuation date should not match the previously recorded date