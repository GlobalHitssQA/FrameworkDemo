Feature: In Pool bag calculation for SOLD plan lines

  Scenario: Verify correct In Pool bag calculation for 1000 active SOLD plan lines during billing cycle
    Given the BSCS7 system is operational with configured parameters
    And 1000 active lines are configured in SOLD plan Rate Plan 3
    When I execute the In Pool calculation shell sh_BSCS_ProcesoFacturaGM
    Then the shell identifies 1000 active lines in SOLD plan for the billing cycle
    And the calculated In Pool bag is 10000 MB for 1000 lines at 10 MB per line
    And the OCC is generated with In Pool Service concept for 1300.00 PEN without IGV
    And the applied rate is 1.30 PEN per 10MB package totaling 1300.00 PEN without IGV