Feature: MANUFACTURE plan data allowance verification
  As a billing system user
  I want to verify that data consumption within the included allowance is not charged
  So that customers are only billed for usage exceeding their plan limits

  Scenario: Verify 100 MB data allowance application for MANUFACTURE plan line
    Given a line is provisioned with MANUFACTURE plan including 10 min voice and 10 SMS and 100 MB data
    And the line is active with configured APNs
    When the line consumes 50 MB of data through the configured APNs during the billing cycle
    And I check the remaining data balance for the line
    Then the system should show 50 MB remaining from the 100 MB allowance
    And the invoice should not show any charge for the 50 MB consumed within the allowance