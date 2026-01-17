Feature: Wealth Management Contract Value and Composition Component in Responsive Landscape View

  Scenario: Verify value and composition component displays and functions correctly in Responsive Landscape view
    Given a Wealth Management user is authenticated in Acticenter
    When the user selects an active Wealth Management contract
    Then the value and composition component is displayed in Responsive Landscape view
    And the component shows the total contract value with correct monetary format
    When the user clicks on the total value component
    Then a popup with the complete contract value breakdown is displayed
    And all applicable items show their corresponding monetary values on the right side
    And items without balance show zero value
    When the user clicks outside the expanded component
    Then the breakdown popup closes correctly