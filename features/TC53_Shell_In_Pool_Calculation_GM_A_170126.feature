Feature: Shell In Pool Calculation GM Account Identification

  Scenario: Verify Shell identifies only General Motors corporate accounts through contract table query
    Given the BSCS7 system is available and the Shell sh_BSCS_ProcesoFacturaGM is deployed
    And at least one active General Motors account exists in the system
    When I execute the Shell sh_BSCS_ProcesoFacturaGM in the test environment
    Then the Shell starts and registers the process in the control table with a unique identifier
    When I verify the Shell queries the CUSTOMER_ID contract table for General Motors accounts
    Then the SQL query returns only CUSTOMER_IDs corresponding to General Motors accounts
    And the Shell excludes accounts that do not belong to General Motors
    And the system does not process any account different from General Motors filtering correctly by corporate client identifier
    When I query the Shell execution log to verify the number of GM accounts identified
    Then the log shows the exact number of General Motors accounts processed and matches the total active GM accounts in the system