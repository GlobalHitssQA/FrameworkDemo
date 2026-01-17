Feature: In Pool billing calculation with excess consumption

  Scenario: Verify correct billing calculation when total consumption exceeds In Pool allocation by 100 MB
    Given the SOLD lines are active with In Pool package configured
    And the parametric table TIM.BSCST_FECT_RNG_PARAM has correct tariffs
    When I calculate the total In Pool allocation for the SOLD line group
    And I configure a consumption scenario that exceeds the allocation by 100 MB
    And I generate telemetry traffic totaling the complete In Pool allocation plus 100 MB additional
    Then the total telemetry consumption recorded equals the assigned allocation plus 100 MB excess
    When I execute the In Pool calculation Shell to process the traffic
    Then the Shell correctly identifies 100 MB excess over the assigned allocation
    And the Shell applies the bulk tariff to the excess
    When I verify the OCC In Pool Service generation
    Then the OCC In Pool Service is generated with amount equal to number of lines multiplied by 1.30 PEN without IGV
    When I verify the OCC In Pool Bulk Service generation for the 100 MB excess
    Then the OCC In Pool Bulk Service is generated with amount equal to 100 multiplied by 0.0372 PEN equals 3.72 PEN without IGV