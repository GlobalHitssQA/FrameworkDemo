Feature: UNSOLD NOT IN SHOWROOM Rate Plan Configuration Verification
  As a system administrator
  I want to verify the UNSOLD NOT IN SHOWROOM Rate Plan configuration in BSCS7
  So that I can ensure the plan is correctly set up for unsold devices outside showroom

  Scenario: Verify complete configuration of UNSOLD NOT IN SHOWROOM Rate Plan
    Given I am logged into the BSCS7 system with query permissions
    When I search for the Rate Plan UNSOLD NOT IN SHOWROOM
    Then the system should display the Rate Plan as a new plan without previous homologation
    And the FU_PACK table should show 10 minutes VOICE included per cycle
    And the FU_PACK table should show 10 SMS included per cycle
    And the FU_PACK table should show 100 MB included per cycle
    And the APN matrix should display all productive APNs APN1 through APN7
    And the SERVICE_VOLTE label should be active in the plan configuration
    And the bulk tariffs for VOICE SMS and DATA should be configured according to specification