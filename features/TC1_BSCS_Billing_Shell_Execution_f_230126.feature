Feature: BSCS Billing Shell Execution for General Motors In Pool Processing

  Scenario: Execute billing shells for GM In Pool telemetry consumption calculation and OCC generation
    Given the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with TMCODE for SOLD plan and SNCODE for In Pool 10MB package
    And the package cost is configured as 1.30 soles and bulk rate as 0.0372 soles per MB
    When I execute the shell sh_BSCS_ProcesoFacturaGM before pre-billing process
    Then a unique process identifier with format GM-sequential is created in the control table
    And the shell identifies General Motors accounts from CUSTOMER_ID contracts table
    And the shell extracts SOLD plan lines with assigned In Pool package
    When the shell copies telemetry traffic from APN1 and APN4 from UDR_LT_01 to temporary work table
    Then the original records in UDR_LT_01 remain with zero cost to avoid double billing
    When I execute the shell sh_BSCS_calculaFacturaGM
    Then the shell summarizes telemetry traffic from APN1 and APN4
    And calculates total consumed MB for all SOLD lines during the billing cycle
    And compares consumption against assigned pool which is number of lines multiplied by 10MB
    When the consumption calculation is complete
    Then OCC1 is generated with concept Servicio In Pool
    And OCC1 amount is calculated as active SOLD lines multiplied by 1.30 soles
    And the corresponding gloss is registered for OCC1
    When total consumption exceeds the assigned pool
    Then OCC2 is generated with concept Servicio granel de In Pool
    And OCC2 amount is calculated as excess MB multiplied by 0.0372 soles
    And the corresponding gloss is registered for OCC2
    When both OCCs are generated
    Then both OCCs are registered correctly in Document All table
    And OCCs are available for HP Extreme billing process consumption
    And the shell execution does not run simultaneously with IZZIPAY shell
    And sequential execution is enforced to avoid work table conflicts