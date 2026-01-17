Feature: Verify In Pool Services amount calculation for SOLD plan

  Scenario: Validate In Pool Services item amount is calculated correctly based on active SOLD lines
    Given the user is authenticated in BSCS7 system
    And there are active lines in SOLD plan
    And the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with rate 1.30 per 10MB package
    When the user identifies the count of active lines in SOLD plan at billing cycle closing day 28
    And the In Pool calculation shell is executed
    Then the system calculates the total assigned pool as lines count multiplied by 10MB
    And the OCC In Pool Services is generated with rate 1.30 per 10MB package
    When the user queries the In Pool Services item amount in the invoice summary
    Then the system displays the amount calculated as active lines count multiplied by 1.30 without IGV
    And the displayed amount matches exactly the formula active lines multiplied by 1.30