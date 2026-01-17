Feature: GM Package Billing Generation with Monthly Cut-off on Day 28

  Scenario: Verify GM package billing is generated correctly with monthly cut-off on day 28
    Given a user with an active GM line on SOLD plan
    And the billing process is configured with cut-off on day 28
    When I activate a TRIAL 6GB package on day 15 of the month
    Then the TRIAL 6GB package is activated successfully with activation date on day 15
    When I activate a B2B2C 12GB package with 12-month validity on day 20 of the month
    Then the B2B2C 12GB package is activated with activation date on day 20
    When I execute the billing process with cut-off date on day 28
    Then the system generates a consolidated invoice for GM with cut-off on day 28
    And the invoice includes TRIAL 6GB package charges for S/. 7.58 without IGV
    And the invoice includes B2B2C 12GB package charges for S/. 29.66 without IGV
    And the invoice cut-off date corresponds to day 28 of the month