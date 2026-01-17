Feature: New Line Registration with MANUFACTURE Plan

  Scenario: Verify new line registration with MANUFACTURE plan and correct provisioning of parameters, included units and productive APNs
    Given the user is authenticated with line registration permissions
    And a SIM card is available for activation
    And the system has active connection to INSTANT LINK, BSCS7 and network
    And the MANUFACTURE plan is configured in the system
    When the user executes the new line registration process selecting the MANUFACTURE plan with its corresponding parameters
    Then the system accepts the registration request and processes the line provision
    And the line is provisioned in INSTANT LINK with MANUFACTURE RATEPLAN and 7 productive APNs
    And the line has configured included units in BSCS7: 10 minutes VOICE, 10 SMS and 100 MB data
    And the excess consumption is billed at bulk rates: VOICE S/.0.07/min, SMS S/.0.05/message, DATA S/.0.2033/MB without IGV
    And the line has VoLTE enabled and APN3 and APN7 allow eSIM profile download
    And the registration transaction is recorded in SIAC Unico with date, time, user and MANUFACTURE plan