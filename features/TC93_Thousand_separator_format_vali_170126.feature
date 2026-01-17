Feature: Thousand separator format validation for monetary values

  Scenario: Verify monetary values greater than thousand use correct thousand separators in component and breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract with monetary values greater than one thousand in multiple categories
    When the user views the total contract value component
    Then the total value should display with comma thousand separators
    When the user clicks on the component to display the breakdown
    Then the breakdown popup should be visible
    And all category values greater than thousand should use comma thousand separators