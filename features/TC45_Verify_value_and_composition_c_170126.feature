Feature: Verify value and composition component in Responsive Portrait view for Wealth Management contracts

  Scenario: Display and interaction of value and composition component in Portrait mode
    Given the user accesses Acticenter with Wealth Management credentials
    When the browser is configured in Responsive Portrait mode
    And the user selects an active Wealth Management contract
    Then the total contract value is displayed correctly in Portrait view
    When the user clicks on the total value component
    Then the popup displays the breakdown of all applicable items
    And the breakdown list is vertically aligned with the main component
    When the user clicks outside the expanded component
    Then the popup closes and the system returns to normal view