Feature: SAP Service Failure Handling for Mexdolar Account

  Scenario: Verify system behavior when SAP service is unavailable for Mexdolar account data
    Given the user is authenticated in Acticenter
    And the SAP service is simulated as unavailable
    When the user selects a Bank contract for Legal Entity with Mexdolar account
    Then the system attempts to invoke the SAP service for Mexdolar balance
    And the system displays an error message or shows USD Cash field as $0.00 with appropriate indication
    And the remaining breakdown fields not dependent on SAP display their corresponding values correctly