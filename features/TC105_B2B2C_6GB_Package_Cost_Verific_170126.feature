Feature: B2B2C 6GB Package Cost Verification in Billing System

  Scenario: Verify that B2B2C 6GB package with 1 month validity costs S/. 16.95 without IGV when activated
    Given I am logged into the BSCS7 billing system
    And the B2B2C 6GB 1 month package is configured in the system
    And the SOLD plan is active
    When I query the package parametric table for B2B2C 6GB 1 month package
    Then the system should display the package cost as "16.95" without IGV
    And the package validity should be "30" days
    When I simulate the activation of B2B2C 6GB 1 month package for a SOLD plan line
    Then the system should generate an activation record with cost "16.95" without IGV
    When I verify the pre-billing process for the package activation
    Then the system should calculate the charge as "16.95" without IGV
    When I query the monthly invoice for the B2B2C 6GB 1 month package concept
    Then the invoice should display the package charge as "16.95" without IGV