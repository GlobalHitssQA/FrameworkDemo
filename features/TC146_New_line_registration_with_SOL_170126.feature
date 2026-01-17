Feature: New line registration with SOLD plan and In Pool configuration

  Scenario: Verify new line registration with SOLD plan provisions correctly with In Pool modality and productive APNs
    Given the user is authenticated with line registration permissions
    And a SIM card is available for activation
    And the SOLD plan and In Pool 10MB package are configured
    When the user initiates new line registration selecting SOLD plan with corresponding parameters
    Then the system accepts the registration request and processes line provisioning
    And the line appears provisioned in INSTANT LINK with SOLD plan
    And the line has APNs APN1 APN2 APN3 APN4 APN5 APN6 APN7 configured
    And in BSCS7 the line has In Pool 10MB package automatically assigned for APN1 and APN4
    And the package shows zero cost in UDR_LT_01
    And consumption on APN2 APN5 APN6 is charged at bulk rates
    And the line has SERVICE_VOLTE active
    And APNs APN3 and APN7 are configured for eSIM profile download
    And the line is included in shared pool calculation before pre-billing
    And the registration transaction is recorded in SIAC Unico with date time user and SOLD plan