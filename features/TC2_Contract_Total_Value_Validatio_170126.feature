Feature: Contract Total Value Validation
  As a user of Acticenter
  I want to verify that the total contract value matches the sum of all breakdown items
  So that I can trust the accuracy of the displayed financial information

  Scenario: Verify total contract value equals sum of breakdown items
    Given I am authenticated and viewing a contract with multiple investment items in Acticenter
    When I click on the total contract value component to display the breakdown
    Then I should see a popup with the breakdown of all applicable items with their monetary values
    And the total value displayed in the main component should match the sum of all breakdown items