Feature: SAP prenotes service error handling for cash in transit

  Scenario: Verify component behavior when SAP prenotes service for cash in transit is unavailable
    Given the SAP prenotes service is unavailable
    And the user is authenticated in Acticenter
    When the user selects a Bank contract that normally has cash in transit
    Then the total contract value component loads with partial error for cash in transit
    When the user opens the breakdown popup
    Then the cash in transit field shows zero or error message
    And all other breakdown fields display their correct values