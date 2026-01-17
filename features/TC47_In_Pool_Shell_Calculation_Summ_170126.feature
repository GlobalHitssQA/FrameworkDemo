Feature: In Pool Shell Calculation Summarizes Telemetry Traffic Correctly

  Scenario: Verify Shell calculation correctly summarizes APN1 telemetry traffic for SOLD plan lines
    Given the BSCS7 system is operational
    And 10 lines are configured in SOLD plan with the following APN1 consumption
      | line | consumption_mb |
      | 1    | 2              |
      | 2    | 5              |
      | 3    | 8              |
      | 4    | 3              |
      | 5    | 12             |
      | 6    | 1              |
      | 7    | 6              |
      | 8    | 4              |
      | 9    | 9              |
      | 10   | 7              |
    And the consumption is registered in UDR_LT_01 table for APN1 onstarsa
    When the Shell sh_BSCS_calculaFacturaGM is executed to summarize APN1 telemetry traffic
    Then the Shell extracts all APN1 traffic records from SOLD plan lines to temporary work table
    And the Shell calculates total APN1 traffic as 57 MB
    And the assigned In Pool bag for 10 SOLD plan lines is 100 MB
    And the consumed traffic of 57 MB is within the assigned bag of 100 MB
    And no excess bulk consumption is generated