Feature: APN4 IPv6 Telemetry Connectivity End-to-End Verification

  Scenario: Verify end-to-end connectivity of APN4 (Onstar01.v6) for IPv6 telemetry traffic on SOLD plan
    Given a line is provisioned with SOLD plan and APN4 Onstar01.v6 configured
    When I verify in BSCS7 that APN4 is assigned and active for the line
    Then the system displays APN4 associated with IPv6 protocol enabled
    When I initiate a data session via APN4 for IPv6 telemetry traffic from the device
    Then the system establishes the IPv6 session via APN4 correctly
    When I transmit telemetry data through APN4 with IPv6 protocol
    Then the telemetry traffic flows correctly and is recorded in UDR_LT_01 table
    And the telemetry traffic via APN4 is accounted for the In Pool quota on SOLD plan
    And the system records the traffic and adds it to the 10 MB In Pool quota of SOLD plan