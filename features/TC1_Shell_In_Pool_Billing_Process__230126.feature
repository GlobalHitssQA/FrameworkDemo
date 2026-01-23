Feature: Shell In Pool Billing Process for General Motors SOLD Plan

  Scenario: Execute Shell billing process for GM SOLD lines with In Pool package
    Given the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with TMCODE for SOLD and SNCODE for In Pool 10MB package with cost 1.30 and bulk rate 0.0372
    When I execute the Shell sh_BSCS_ProcesoFacturaGM before pre-billing process
    Then a unique process identifier with format GM-sequential is registered in control table
    And the Shell identifies General Motors accounts from contracts table with SOLD plan and In Pool package
    When the Shell copies telemetry traffic from APN1 and APN4 from UDR_LT_01 to temporary work table
    Then the records in UDR_LT_01 remain with zero cost to avoid double billing
    When I execute the Shell sh_BSCS_calculaFacturaGM to summarize telemetry traffic
    Then the Shell calculates total MB consumed and compares against assigned pool of active lines times 10MB
    And the Shell generates OCC1 Service In Pool with amount calculated as active SOLD lines times 1.30
    And if consumption exceeds assigned pool the Shell generates OCC2 Bulk In Pool Service with excess MB times 0.0372
    And both OCCs are registered correctly in Document All table for HP Extreme billing process
    And the Shell does not execute simultaneously with IZZIPAY Shell due to shared work tables