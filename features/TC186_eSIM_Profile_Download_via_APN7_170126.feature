Feature: eSIM Profile Download via APN7 at No Cost for Productive Plans

  Scenario: Verify lines in productive plans can download eSIM profile using APN7 without cost
    Given GM lines are provisioned in MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT plans with APN7 configured
    When I initiate eSIM profile download process from devices in each plan using APN7
    And I complete the eSIM profile download for each line
    Then the eSIM profile should download successfully without errors for all lines
    And I verify in BSCS7 that APN7 traffic has zero cost in UDR_LT_01 table
    And the consolidated GM invoice should not include charges for eSIM profile downloads