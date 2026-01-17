Feature: APN2 GMSA End-to-End Connectivity for FOTA Navigation

  Scenario: Verify end-to-end connectivity of APN2 (gmsa) for FOTA navigation on eligible plans
    Given a user is authenticated in the provisioning system
    And the network components HLR HSS IMS PCRF are configured
    And Instant Link is operational
    And BSCS7 is available
    When the user provisions a line with a plan that allows APN2 traffic
    And the user selects one of the eligible plans TESTING MANUFACTURE UNSOLD_NOT_IN_SHOWROOM UNSOLD_SHOWROOM SOLD or DORMANT
    Then the line should be provisioned correctly with the selected plan
    And the APN2 gmsa should be configured for the line
    When the user verifies the APN2 assignment in BSCS7
    Then the system should display APN2 gmsa associated with the line
    And the APN2 status should be active
    When a data session is initiated through APN2 gmsa for FOTA navigation
    Then the system should establish the data session correctly through APN2
    When FOTA navigation traffic flows through APN2
    Then the traffic should be registered in the UDR_LT_01 table
    When end-to-end connectivity is verified from device to FOTA servers
    Then the connectivity should be successful
    And FOTA updates should be downloadable