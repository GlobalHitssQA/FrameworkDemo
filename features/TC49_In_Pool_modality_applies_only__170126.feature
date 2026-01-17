Feature: In Pool modality applies only to local telemetry data consumption

  Scenario: Verify In Pool modality applies only to local telemetry traffic and Roaming is billed at standard bulk rate
    Given lines are configured in SOLD plan with telemetry traffic
    And APN1 has 20 MB local consumption and 15 MB Roaming consumption
    And APN4 has 10 MB local consumption and 8 MB Roaming consumption
    When the billing calculation shell is executed
    Then the system registers traffic differentiating local and Roaming consumption in UDR_LT_01 table
    And the shell identifies and separates local traffic from Roaming traffic for APN1 and APN4
    And In Pool summarization includes only 30 MB of local traffic
    And Roaming traffic of 23 MB is excluded from In Pool calculation
    And Roaming traffic is billed at standard bulk rate of 0.2033 per MB without IGV
    And separate OCCs are generated for In Pool service and Roaming bulk traffic