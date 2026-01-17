Feature: Contract Total Value Validation
  As a user of Acticenter
  I want to verify that the total contract value matches the sum of all breakdown items
  So that I can trust the accuracy of the financial information displayed

  Scenario: Verify total contract value equals sum of all breakdown items
    Given I am authenticated in Acticenter
    And I have selected an active contract
    When I view the contract screen with the total value component
    And I record the total value displayed in the main component
    And I click on the component to display the breakdown popup
    And I calculate the sum of all breakdown items
    Then the total value should match exactly the sum of all breakdown items
    And items with zero value should be displayed as zero