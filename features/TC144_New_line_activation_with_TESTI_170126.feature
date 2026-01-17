Feature: New line activation with TESTING plan

  Scenario: Activate a new line with TESTING plan and verify correct provisioning
    Given the user is authenticated with line activation permissions
    And a SIM card is available for activation
    And TESTING plan is configured in the system
    When the user initiates new line activation process
    And the user selects TESTING plan with corresponding parameters
    And the user submits the activation request
    Then the system accepts the activation request and processes the line provision
    And the line is provisioned in INSTANT LINK with TESTING rateplan
    And the line has APN2 and APN6 pre-productive APNs configured
    And the line in BSCS7 has TESTING plan with bulk tarification for VOICE SMS and DATA
    And the VOICE rate is 0.07 soles per minute
    And the SMS rate is 0.05 soles per message
    And the DATA rate is 0.2033 soles per MB without IGV
    And the line has VoLTE enabled in HLR HSS and IMS network systems
    And the SERVICE_VOLTE parameter is provisioned
    And the activation is recorded in SIAC Unico with date time user and TESTING plan