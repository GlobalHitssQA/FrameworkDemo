Feature: In Pool Traffic Validation for Telemetry APNs

  Scenario: Verify that In Pool modality only applies to telemetry traffic from APN1 and APN4 on SOLD plan lines
    Given the BSCS7 system is operational
    And lines are configured in SOLD plan with registered traffic in UDR_LT_01
    When I configure traffic data for multiple APNs with specific MB values
    And I execute the In Pool calculation shell script
    Then the shell should identify only APN1 and APN4 traffic for In Pool calculation
    And the total In Pool traffic should be 8 MB from APN1 and APN4 combined
    And APN2 APN5 and APN6 traffic should not be included in In Pool calculation
    And separate OCCs should be generated for In Pool and bulk traffic