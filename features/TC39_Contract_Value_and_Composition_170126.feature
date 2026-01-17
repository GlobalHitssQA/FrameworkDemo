Feature: Contract Value and Composition for Individual Person in Patrimonial Banking

  Scenario: Verify contract value and composition component displays all applicable items for Individual Person contract in Patrimonial Banking
    Given the user is authenticated in Acticenter with a Patrimonial Banking profile
    When the user selects an Individual Person contract from Patrimonial Banking
    Then the total contract value component should be displayed on the screen
    When the user clicks on the total contract value component
    Then the system displays the popup with contract value breakdown
    And the applicable items for Individual Person Patrimonial Banking are shown correctly
    And all monetary values are displayed on the right side with correct currency format
    When the user clicks outside the breakdown component
    Then the breakdown popup closes correctly