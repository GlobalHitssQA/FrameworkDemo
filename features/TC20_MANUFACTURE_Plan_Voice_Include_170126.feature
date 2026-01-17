Feature: MANUFACTURE Plan Voice Included Minutes and Excess Billing

  Scenario: Verify that 10 included voice minutes are applied correctly and excess is billed at S/. 0.07 per minute
    Given a line is provisioned in MANUFACTURE plan with 10 min VOICE, 10 SMS and 100 MB included
    When the line registers 15 minutes of local voice consumption during the billing cycle
    And the billing process is executed for the corresponding cycle
    Then the first 10 minutes should be deducted from included minutes without charge
    And the 5 excess minutes should be billed in bulk at S/. 0.35 without IGV