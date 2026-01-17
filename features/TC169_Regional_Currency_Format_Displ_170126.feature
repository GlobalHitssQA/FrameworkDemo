Feature: Regional Currency Format Display

  Scenario: Verify amounts are displayed correctly according to regional configuration
    Given the user is authenticated in Acticenter with Mexico regional configuration
    When the user selects a contract and expands the value and composition breakdown
    Then all amounts should display correct Mexican format with peso symbol and proper separators
    And MXN amounts should show "$" symbol and USD amounts should show "USD" identifier
    When the user changes the browser regional configuration to a different locale
    Then the system should update amount display format according to new regional configuration
    And all decimal and thousand separators should adjust to the new configuration maintaining readability