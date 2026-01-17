Feature: Shell generates two OCCs correctly when excess consumption exists

  Scenario: Verify Shell generates OCC for In Pool Service and OCC for In Pool Bulk Service with correct amounts
    Given the system has 100 active lines in SOLD plan with a pool of 1000 MB
    And the total consumption is 1500 MB exceeding the pool by 500 MB
    When the user executes the Shell sh_BSCS_ProcesoFacturaGM to generate OCCs
    Then the Shell processes correctly and generates two separate OCCs
    And the Document All table shows OCC for In Pool Service with amount 130.00 without IGV
    And the Document All table shows OCC for In Pool Bulk Service with amount 18.60 without IGV
    And both OCCs are registered with correct CUSTOMER_ID and differentiated concepts
    And both OCCs have correct amounts calculated according to parametric rates
    And both OCCs are available for pre-billing status
    And the Shell log shows OCC1 In Pool Service 130.00 and OCC2 In Pool Bulk Service 18.60
    And the Shell log confirms total billed amount of 148.60