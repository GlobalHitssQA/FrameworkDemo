Feature: In Pool Telemetry Consumption Summary Verification

  Scenario: Verify that In Pool summary displays telemetry consumption within assigned quota
    Given the SOLD lines have telemetry consumption during the billing cycle
    And the In Pool calculation shell has been executed
    And the assigned quota is calculated based on number of lines times 10 MB
    And the billing cycle is closed
    When I review the total telemetry consumption for APN1 and APN4
    Then I should obtain the total MB consumed by telemetry
    When I compare the total consumption against the assigned quota
    Then I should determine if consumption is less than or equal to the assigned quota
    When I access the In Pool 10 MB summary in the Traffic Detail SOLD section
    Then I should see the consolidated summary displayed
    And I should see the consumption within quota field with the correct value
    And the amount associated should apply the In Pool rate of 1.30 soles per package