Feature: SOLD Plan In Pool Telemetry Traffic Verification

  Scenario: Verify telemetry traffic by APN4 when group consumption exceeds In Pool assigned quota
    Given 30 lines are provisioned in SOLD plan with APN4 configured for telemetry
    And the In Pool quota is calculated as 300 MB for the group
    When telemetry traffic of 450 MB is generated through APN4 distributed among the 30 lines
    And the In Pool calculation Shell is executed before pre-billing
    Then the system should generate an OCC for In Pool Service with amount 39.00 soles
    And the system should generate an OCC for In Pool Bulk Service with excess amount 5.58 soles
    And both OCCs should be displayed in the Traffic Detail SOLD section of the invoice