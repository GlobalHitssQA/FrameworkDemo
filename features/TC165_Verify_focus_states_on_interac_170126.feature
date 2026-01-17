Feature: Verify focus states on interactive elements for accessibility compliance

  Scenario: Interactive elements display visible focus state when receiving keyboard or click focus
    Given the user is authenticated in Acticenter with an active contract
    When the user navigates to the contract value and composition component
    And the user presses Tab to focus on the main component
    Then the component should display a visible focus indicator
    When the user presses Enter to open the breakdown popup
    Then the breakdown popup should be displayed
    And the user can navigate between elements using Tab key
    And each element should display a clear and distinguishable focus state
    And the focus states should comply with WCAG 2.1 accessibility standards