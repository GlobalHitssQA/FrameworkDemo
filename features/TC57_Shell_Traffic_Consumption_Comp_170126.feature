Feature: Shell Traffic Consumption Comparison for Telemetry

  Scenario: Verify Shell correctly compares total telemetry traffic consumption against assigned pool to determine surplus
    Given a BSCS7 system is available with Shell sh_BSCS_calculaFacturaGM deployed
    And there are 100 active lines in SOLD plan with assigned pool of 1000 MB
    And the UDR_LT_01 table contains telemetry consumption data for APN1 and APN4
    When I configure a scenario with total telemetry consumption of 800 MB
    And I execute the Shell sh_BSCS_calculaFacturaGM to perform the comparison
    Then the Shell calculates the assigned pool as 1000 MB and total consumption as 800 MB
    And the system determines there is no surplus since consumption is less than assigned pool
    When I modify the scenario with total consumption of 1200 MB
    And I execute the Shell sh_BSCS_calculaFacturaGM again
    Then the Shell identifies consumption of 1200 MB exceeds assigned pool of 1000 MB
    And the system determines there is a surplus of 200 MB
    And the logs display assigned pool 1000 MB, total consumption 1200 MB, and surplus 200 MB for audit traceability