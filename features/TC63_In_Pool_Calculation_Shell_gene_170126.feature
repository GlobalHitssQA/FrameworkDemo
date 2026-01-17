Feature: In Pool Calculation Shell generates OCCs and registers them in Document All table

  Scenario: Verify In Pool Shell generates Service In Pool and Service In Pool Bulk OCCs correctly
    Given the In Pool calculation Shell is configured and functional
    And there are SOLD plan lines with telemetry traffic available
    And the Document All table is accessible
    And the parametric table TIM.BSCST_FECT_RNG_PARAM has configured rates
    When I configure a scenario with SOLD lines consuming In Pool traffic within the assigned pool
    And I execute the In Pool calculation Shell for the billing cycle
    Then the Shell executes correctly and processes telemetry traffic from SOLD lines
    When I query the Document All table filtering by Service In Pool concept and billing period
    Then an OCC is registered with Service In Pool concept with amount equal to number of 10MB packages multiplied by 1.30 soles
    When I configure an additional scenario with SOLD lines exceeding the assigned In Pool pool
    And I execute the In Pool calculation Shell with the excess consumption scenario
    Then the Shell processes correctly the excess consumption and calculates additional MB at bulk rate
    When I query the Document All table filtering by Service In Pool Bulk concept and processed period
    Then an OCC is registered with Service In Pool Bulk concept with amount equal to excess MB multiplied by 0.0372 soles