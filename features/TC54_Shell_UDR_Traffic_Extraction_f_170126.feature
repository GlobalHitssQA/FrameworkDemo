Feature: Shell UDR Traffic Extraction for SOLD Plan Lines

  Scenario: Verify Shell correctly extracts telemetry traffic from SOLD plan lines from UDR_LT_01 to temporary work table
    Given the BSCS7 system is available and configured
    And the Shell sh_BSCS_calculaFacturaGM is deployed
    And the UDR_LT_01 table exists with test traffic data structure
    And the temporary work table is created and empty
    And the In Pool package is configured with zero cost in BSCS7
    When I insert test traffic records in UDR_LT_01 for SOLD plan lines with APN1 and APN4 traffic
    And I execute the Shell sh_BSCS_calculaFacturaGM to process SOLD plan line traffic
    Then the Shell should start correctly and read traffic records from UDR_LT_01
    And the temporary table should contain all telemetry traffic records from SOLD lines
    And the temporary table should include all lines that were in SOLD Rate Plan during the cycle
    And the original records in UDR_LT_01 should maintain zero cost
    And the temporary table should not contain traffic records from APN2 APN5 or APN6