Feature: B2B2C 10GB Package Cost Verification in Billing System

  Scenario: Verify B2B2C 10GB package with 1 month validity costs S/. 21.19 without IGV when activated
    Given the user is logged into the BSCS7 billing system
    And the B2B2C 10GB 1 month package is configured in the system
    When the user queries the parametric package table for B2B2C 10GB 1 month
    Then the system displays the package cost as "21.19" soles without IGV
    And the package validity is "30" days
    When the user simulates activation of B2B2C 10GB 1 month package for a SOLD plan line
    Then the system generates an activation record with cost "21.19" soles without IGV
    When the user verifies the pre-billing process for the package activation
    Then the system calculates the charge as "21.19" soles without IGV
    When the user queries the monthly invoice for the B2B2C 10GB 1 month package
    Then the invoice displays the package charge as "21.19" soles without IGV