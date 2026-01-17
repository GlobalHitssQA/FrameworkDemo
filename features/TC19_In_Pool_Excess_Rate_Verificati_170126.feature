Feature: In Pool Excess Rate Verification
  As a billing administrator
  I want to verify that the In Pool excess rate is correctly applied
  So that telemetry consumption exceeding the shared pool is billed at S/. 0.0372 per MB

  Scenario: Verify In Pool excess rate calculation when consumption exceeds shared pool
    Given I have 10 lines configured with SOLD plan and 10MB In Pool package each
    And the total shared pool is 100 MB
    When the total telemetry consumption reaches 150 MB across all lines
    And I execute the In Pool calculation Shell before pre-billing
    Then the system should calculate 50 MB of excess consumption
    And an OCC for In Pool Service should be generated for S/. 13.00 without IGV
    And an OCC for In Pool Bulk Service should be generated for S/. 1.86 without IGV
    And the invoice should display In Pool Services for S/. 13.00
    And the invoice should display In Pool Bulk Services for S/. 1.86