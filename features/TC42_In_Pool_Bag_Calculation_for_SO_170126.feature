Feature: In Pool Bag Calculation for SOLD Plan Lines

  Scenario: Verify correct In Pool bag calculation with 100 active lines in SOLD plan during billing cycle
    Given the BSCS7 system is operational with configured parametric tables
    And 100 active lines are configured in SOLD plan Rate Plan 3 for the billing cycle
    When the In Pool calculation Shell sh_BSCS_ProcesoFacturaGM is executed before pre-billing
    Then the Shell identifies 100 active lines in SOLD plan for the billing cycle
    And the calculated In Pool bag is 1000 MB for 100 lines at 10 MB per line
    And an OCC is generated for In Pool Service concept with value 130.00 PEN without IGV
    And the applied rate is 1.30 PEN per 10MB package totaling 130.00 PEN for 100 lines