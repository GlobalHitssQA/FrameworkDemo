Feature: Verify telemetry traffic for SOLD lines with In Pool package records with zero cost in UDR_LT_01

  Scenario: Telemetry traffic from SOLD lines with In Pool package is registered with zero cost to avoid double billing
    Given I have access to the database query system
    And I have active SOLD plan lines with In Pool 10MB package and telemetry APNs configured
    When I identify active lines in SOLD plan with In Pool 10MB package and telemetry APNs APN1 and APN4
    Then I should obtain a list of SOLD plan lines with active In Pool package and enabled telemetry APNs
    When I generate test telemetry traffic through APN1 and APN4 for the identified SOLD lines during the billing cycle
    Then the telemetry traffic should be generated correctly and captured by the measurement system
    When I query the UDR_LT_01 table filtering by test lines in SOLD plan and telemetry APNs traffic
    Then the telemetry traffic records should appear in UDR_LT_01 table with correct identification fields
    When I verify the cost field in In Pool traffic records in UDR_LT_01 table for SOLD lines
    Then all In Pool telemetry traffic records should show cost equal to zero in UDR_LT_01 table
    When I execute the In Pool calculation Shell
    Then the Shell should correctly copy records with zero cost from UDR_LT_01 to temporary table without modifying UDR_LT_01