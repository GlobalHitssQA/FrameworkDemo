Feature: In Pool Shell Traffic Summarization for Telemetry

  Scenario: Verify that the In Pool calculation Shell correctly summarizes telemetry traffic from APN4 for SOLD plan lines
    Given the BSCS7 system is operational
    And 10 lines are configured in SOLD plan with the following APN4 consumption:
      | line   | consumption_mb |
      | Line1  | 3              |
      | Line2  | 7              |
      | Line3  | 4              |
      | Line4  | 9              |
      | Line5  | 2              |
      | Line6  | 11             |
      | Line7  | 5              |
      | Line8  | 8              |
      | Line9  | 6              |
      | Line10 | 10             |
    When I execute the Shell sh_BSCS_calculaFacturaGM to summarize APN4 telemetry traffic
    Then the Shell extracts all APN4 traffic records from SOLD plan lines to the temporary work table
    And the Shell calculates the total APN4 traffic as 65 MB
    And the assigned In Pool bucket is 100 MB for 10 lines
    And the consumption of 65 MB is within the assigned bucket of 100 MB without generating bulk excess