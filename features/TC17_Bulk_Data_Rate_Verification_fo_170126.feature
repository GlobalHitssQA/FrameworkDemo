Feature: Bulk Data Rate Verification for SOLD Plan

  Scenario: Verify bulk data rate is correctly applied at S/. 0.2033 per MB without IGV for consumption exceeding included or in APNs outside In Pool
    Given a line is configured with SOLD plan with bulk billing APNs
    When I register 50 MB of local data consumption on APN2 gmsa for FOTA navigation
    And I execute the billing process for the corresponding cycle
    Then the invoice should show a bulk data charge of S/. 10.165 without IGV
    And the invoice should show a total charge with IGV of S/. 11.995