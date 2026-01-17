Feature: Verify TESTING plan data traffic charges at bulk rate through APN1

  Scenario: Data traffic in TESTING plan is charged at bulk rate using preproductive APN1
    Given a line is provisioned in TESTING plan with preproductive APN1 Onstarsa
    When the user verifies the TESTING plan APN configuration
    Then the system should show only preproductive APNs configured
    And the system should not show productive APNs APN3 and APN7
    When the user generates telemetry data traffic through preproductive APN1
    Then the traffic should flow correctly through preproductive APN1
    When the user checks the UDR_LT_01 table for traffic records
    Then the consumption should be registered with bulk rate of 0.2033 soles per MB without IGV
    And the system should block traffic through productive APNs for TESTING plan