Feature: PCRF Policy Verification for APN Traffic Control in Life Cycle RATEPLAN

  Scenario: Verify PCRF policies are correctly applied to control data traffic for each APN according to Life Cycle RATEPLAN
    Given a General Motors line is provisioned in Instant Link with SOLD RATEPLAN
    And PCRF is configured with policies for the 7 APNs of the new Life Cycle
    When I execute the provisioning from Instant Link with In Pool configuration for telemetry on APN1 and APN4
    Then PCRF should receive policy configuration for APN1 and APN4 with In Pool modality
    And PCRF should receive policy configuration for APN2 APN5 and APN6 with bulk modality
    When I verify the traffic control policies in PCRF for each APN
    Then PCRF should display active policies for telemetry APNs with In Pool rate
    And PCRF should display active policies for navigation and FOTA APNs with bulk rate
    When I generate data traffic through APN1 for telemetry
    Then PCRF should register APN1 traffic applying In Pool policy deducting from the shared 10MB pool
    When I generate data traffic through APN2 for internet navigation
    Then PCRF should register APN2 traffic applying bulk rate of 0.2033 soles per MB
    When I exhaust the In Pool telemetry quota and generate additional traffic through APN1
    Then PCRF should detect the exhausted In Pool quota and apply excess bulk rate of 0.0372 soles per MB
    When I switch to TESTING RATEPLAN with pre-productive APNs
    Then PCRF should apply policies only for pre-productive APNs APN2 APN6 and APN7
    And PCRF should block traffic through productive APNs