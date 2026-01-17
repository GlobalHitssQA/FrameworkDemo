Feature: APN6 WiFi Traffic End-to-End Connectivity Verification

  Scenario: Verify end-to-end connectivity of APN6 (onstarawificp) for WiFi traffic on productive plans
    Given a line is provisioned with MANUFACTURE plan and APN6 configured for WiFi traffic
    When I verify in BSCS7 that APN6 is assigned and active for the line
    Then the system displays APN6 associated with the line in productive status
    When I initiate a data session through APN6 for WiFi traffic from the device
    Then the system establishes the data session correctly through APN6
    When I perform WiFi data traffic through APN6
    Then the traffic flows correctly and is recorded in UDR_LT_01 table
    And the traffic through APN6 is billed in bulk at rate of S/. 0.2033 per MB without IGV