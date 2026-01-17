Feature: Roaming Traffic Billing Verification for SOLD Plan Lines

  Scenario: Verify that roaming traffic does not apply In Pool modality and is charged at bulk rate for SOLD plan lines
    Given GM lines are active in SOLD plan with In Pool 10MB package assigned and available
    When telemetry traffic is generated from APN1 and APN4 in international roaming mode
    And the In Pool calculation Shell is executed
    And the billing process is executed
    Then the roaming traffic should be registered in UDR_LT_01 table without applying In Pool package
    And the Shell should exclude roaming traffic from In Pool shared package calculation
    And the roaming traffic should be charged at bulk rate of 0.2033 PEN per MB without In Pool discount
    And the roaming traffic should not appear in SOLD In Pool Traffic Detail section
    And the roaming traffic should be billed in a separate section at bulk rate