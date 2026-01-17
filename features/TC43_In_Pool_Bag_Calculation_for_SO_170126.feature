Feature: In Pool Bag Calculation for SOLD Plan Lines

  Scenario: Verify correct In Pool bag calculation for 500 active lines in SOLD plan during billing cycle
    Given the BSCS7 system is operational with required shells developed
    And the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with In Pool rates
    When I configure 500 active lines in SOLD plan Rate Plan 3 in BSCS7 system
    Then the 500 lines should be registered in SOLD plan in the database
    When I execute the In Pool calculation shell sh_BSCS_ProcesoFacturaGM before pre-billing
    Then the shell should identify 500 active lines in SOLD plan for the billing cycle
    And the calculated In Pool bag should be 5000 MB for 500 lines at 10 MB per line
    When I query the generated OCCs for In Pool Service concept
    Then an OCC should be generated with In Pool Service concept for S/. 650.00 without IGV
    And the applied rate should be S/. 1.30 per 10MB package totaling S/. 650.00 without IGV