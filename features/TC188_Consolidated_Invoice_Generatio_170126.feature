Feature: Consolidated Invoice Generation for GM Life Cycle

  Scenario: Verify consolidated invoice generation includes all GM Life Cycle lines and services
    Given the GM corporate account is configured with lines in all Life Cycle plans
    And the lines are distributed across TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT plans
    When varied consumption is generated including pool data, bulk, packages, In Pool and additional services
    And the In Pool calculation Shell is executed for SOLD plan telemetry traffic
    And the billing process is executed with cutoff day 29
    Then a single consolidated invoice is generated for GM
    And the invoice includes Services In Pool section with correct amounts
    And the invoice includes Services In Pool Bulk section with correct amounts
    And the invoice includes Additional Services section
    And the invoice includes Traffic Detail section with LDI and Roaming
    And the invoice total equals sum of all concepts plus 18 percent IGV