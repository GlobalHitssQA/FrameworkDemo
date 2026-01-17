Feature: Rate Plan DORMANT Configuration Verification
  As a system administrator
  I want to verify the Rate Plan DORMANT configuration in BSCS7
  So that I can ensure inactive lines without included services are properly configured

  Scenario: Verify Rate Plan DORMANT configuration for inactive lines without included services
    Given I am logged into the BSCS7 system with query permissions
    When I navigate to the Rate Plan DORMANT configuration
    Then the system should display Rate Plan DORMANT as a new plan without legacy homologation
    And the Rate Plan DORMANT should have no configured included services for VOICE SMS or DATA
    And the system should show no records in FU_PACK and FUP_VERSION tables for Rate Plan DORMANT
    When I verify the bulk billing tariffs configuration
    Then the VOICE tariff should be configured at 0.07 soles per minute
    And the SMS tariff should be configured at 0.05 soles per message
    And the DATA tariff should be configured at 0.2033 soles per MB
    When I check the APN matrix configuration
    Then all productive APNs APN1 APN2 APN3 APN4 APN5 APN6 and APN7 should be assigned
    When I verify the VoLTE service configuration
    Then the SERVICE_VOLTE label should be active in the plan configuration