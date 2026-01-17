Feature: Verify SMS included usage for MANUFACTURE plan

  Scenario: SMS consumption is deducted from included SMS balance in MANUFACTURE plan
    Given a line is provisioned with MANUFACTURE plan with included services
    When the user consumes 5 SMS from the MANUFACTURE plan line
    And the user checks the remaining SMS balance
    Then the system should show 5 remaining SMS from 10 included
    And the invoice should not show charges for the 5 consumed SMS