Feature: Contract total value breakdown in Responsive Portrait view

  Scenario: Open contract total value breakdown popup in Responsive Portrait view
    Given the user is authenticated in Acticenter application
    And the browser is configured with Responsive Portrait resolution
    When the user searches and selects a valid contract
    Then the contract total value component is displayed
    When the user clicks on the contract total value component
    Then the breakdown popup is displayed on the right side with all applicable monetary values