Feature: Contract Total Value Validation

  Scenario: Verify that the total contract value matches the sum of all breakdown items
    Given the user is authenticated in Acticenter with an advisor role
    And the user has access to an active contract with multiple value items
    When the user accesses the Acticenter module and selects a contract
    Then the contract value and composition component is displayed with the total value
    When the user clicks on the component to expand the complete breakdown
    Then the popup with the detailed breakdown of all applicable items is displayed
    When the user calculates the sum of all monetary values from the breakdown items
    Then the manual sum matches exactly with the total value shown in the main component
    And there are no rounding discrepancies in the decimal values