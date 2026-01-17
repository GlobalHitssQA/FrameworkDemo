Feature: Verify 2GB data included application in UNSOLD SHOWROOM plan

  Scenario: Line consumes data within assigned 2GB bundle in UNSOLD SHOWROOM plan
    Given a line is provisioned with UNSOLD SHOWROOM plan with 2GB data included
    And the line has 100 minutes voice and 100 SMS included
    When the line consumes 1.5GB of data through configured APNs during billing cycle
    Then the system should register consumption of 1.5GB deducted from 2GB included
    And the remaining data balance should show 0.5GB or 512MB
    When the user verifies the invoice for the billing period
    Then the invoice should not show additional charges for the 1.5GB consumed
    And the consumption should be marked as included in the plan