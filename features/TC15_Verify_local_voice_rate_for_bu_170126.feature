Feature: Verify local voice rate for bulk consumption

  Scenario: Validate local voice rate at S/. 0.07 per minute without IGV for bulk plans
    Given a line is configured with a bulk voice billing plan
    When I register 10 minutes of local voice consumption for the line
    And I execute the billing process for the corresponding cycle
    Then the invoice should show a charge of S/. 0.70 without IGV for local voice
    And the invoice should show a charge of S/. 0.826 with IGV included