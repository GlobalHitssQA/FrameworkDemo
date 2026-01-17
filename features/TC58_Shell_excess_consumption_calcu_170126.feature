Feature: Shell excess consumption calculation for GM billing

  Scenario: Verify Shell correctly determines excess consumption and calculates exact overage amount
    Given the BSCS7 system is available with Shell sh_BSCS_calculaFacturaGM deployed
    And the UDR_LT_01 table is configured with variable consumption data
    When I configure scenario 1 with 50 SOLD lines with 500 MB pool and 450 MB total consumption
    And I execute the Shell sh_BSCS_calculaFacturaGM for scenario 1
    Then the system should determine no excess exists and register excess as 0 MB
    When I configure scenario 2 with 50 SOLD lines with 500 MB pool and 500 MB exact consumption
    And I execute the Shell sh_BSCS_calculaFacturaGM for scenario 2
    Then the system should determine no excess exists at limit and register excess as 0 MB
    When I configure scenario 3 with 50 SOLD lines with 500 MB pool and 750 MB total consumption
    And I execute the Shell sh_BSCS_calculaFacturaGM for scenario 3
    Then the system should determine excess exists and calculate 250 MB overage for bulk billing