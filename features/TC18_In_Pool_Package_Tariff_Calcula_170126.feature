Feature: In Pool Package Tariff Calculation

  Scenario: Verify In Pool tariff is correctly applied at S/. 1.30 per 10MB within shared pool
    Given I am authenticated in the billing system
    And I have 5 active lines configured with SOLD plan
    When I configure each line with 10MB In Pool package creating a shared pool of 50MB
    And I register 40MB total telemetry consumption across APN1 and APN4
    And I execute the In Pool calculation Shell before pre-billing
    Then the system should generate an OCC for In Pool Service with amount S/. 6.50 without IGV
    And the invoice should display In Pool Services section with S/. 6.50 without IGV
    And the invoice should show S/. 7.67 with IGV included