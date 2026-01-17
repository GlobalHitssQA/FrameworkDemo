Feature: Shell generates correct In Pool Service OCC when consumption is within assigned pool

  Scenario: Verify OCC generation for In Pool Service with correct amount when total consumption is within the assigned pool
    Given the system has 100 active lines in SOLD plan with a pool of 1000 MB
    And the total telemetry consumption is 850 MB which is within the assigned pool
    When I execute the Shell sh_BSCS_ProcesoFacturaGM to generate the corresponding OCCs
    Then the Shell processes correctly and executes the OCC generation function
    And I query the Document All table to verify the In Pool Service OCC creation
    And an OCC with concept In Pool Service is generated for an amount of S/. 130.00 without IGV
    And I verify that NO In Pool Bulk Service OCC is generated because there is no excess
    And the Document All table does not contain any In Pool Bulk Service OCC for this period
    And I validate the generated OCC contains the correct gloss and is ready for HP Extreme consumption
    And the OCC has all required fields complete including CUSTOMER_ID concept amount cycle date and pre-billing status