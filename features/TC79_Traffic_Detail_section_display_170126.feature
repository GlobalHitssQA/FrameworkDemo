Feature: Traffic Detail section displays the correct plan at billing cycle close

  Scenario: Verify that Traffic Detail shows the plan active at day 28 billing cycle close
    Given the user is authenticated in BSCS7 system
    And there is a line that changed plan during the billing cycle from MANUFACTURE to SOLD
    When the billing process is executed with cutoff on day 28
    And the user navigates to the Traffic Detail section for the line
    Then the Plan field displays the RATEPLAN active at cycle close day 28
    And the plan shown corresponds to the plan active on day 28 not previous plans
    And the consumption displayed includes all traffic from the complete cycle