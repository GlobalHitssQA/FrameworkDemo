Feature: Shell APN Traffic Summarization for GM Billing

  Scenario: Verify Shell summarizes only APN1 and APN4 traffic excluding other APNs
    Given the BSCS7 system is available and Shell sh_BSCS_calculaFacturaGM is deployed
    And a SOLD plan line exists with traffic records in UDR_LT_01 table
    When I insert test traffic records with 50 MB on APN1, 30 MB on APN2, 40 MB on APN4, 20 MB on APN5, and 10 MB on APN6
    And I execute the Shell sh_BSCS_calculaFacturaGM to summarize telemetry traffic
    Then the total summarized traffic should be 90 MB from APN1 and APN4 only
    And the traffic from APN2, APN5, and APN6 should be excluded from In Pool calculation
    And the execution logs should document that only APN1 and APN4 were included in the summarization