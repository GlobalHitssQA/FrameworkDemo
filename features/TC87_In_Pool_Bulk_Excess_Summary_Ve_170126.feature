Feature: In Pool Bulk Excess Summary Verification

  Scenario: Verify that In Pool summary displays bulk excess when telemetry consumption exceeds allocated pool
    Given the telemetry consumption scenario is configured with pool of 1000 MB and consumption of 1150 MB
    And the billing process and In Pool calculation Shell have been executed
    When I access the In Pool 10 MB summary in the Traffic Detail SOLD section of the invoice
    Then I should see the summary with all concepts displayed
    And I should see the Bulk Excess field showing 150 MB of excess
    And the excess amount should be calculated as 150 MB multiplied by 0.0372 resulting in 5.58 soles without IGV
    When I verify a scenario where consumption does not exceed the pool
    Then the Bulk Excess field should not be displayed or should show 0.00 soles