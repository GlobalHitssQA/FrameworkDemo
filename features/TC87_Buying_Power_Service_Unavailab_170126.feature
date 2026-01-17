Feature: Buying Power Service Unavailability Handling

  Scenario: Verify component behavior when Buying Power service is unavailable
    Given the Buying Power service is unavailable for Casa de Bolsa contracts
    And the user is authenticated in Acticenter
    When the user selects a Casa de Bolsa contract
    Then the system attempts to load the total contract value component
    And the system displays an appropriate error message for Buying Power or shows $0.00 with error indication
    When the user opens the contract value breakdown popup
    Then the popup displays error or indeterminate value for Buying Power MXN
    And the other available items display correctly
    And the application continues functioning without interruption