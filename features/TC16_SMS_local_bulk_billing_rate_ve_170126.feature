Feature: SMS local bulk billing rate verification
  As a billing administrator
  I want to verify that local SMS bulk consumption is billed at S/. 0.05 per message
  So that customers are charged correctly according to the Life Cycle plan rates

  Scenario: Verify local SMS bulk rate is applied correctly at S/. 0.05 per message without IGV
    Given a line is configured in a Life Cycle plan with bulk SMS billing
    When I register consumption of 20 local SMS for the line
    And I execute the billing process for the corresponding cycle
    Then the invoice should show a charge of S/. 1.00 without IGV for local SMS
    And the invoice should show a total charge of S/. 1.18 with IGV included