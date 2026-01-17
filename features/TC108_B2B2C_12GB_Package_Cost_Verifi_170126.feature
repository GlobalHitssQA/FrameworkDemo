Feature: B2B2C 12GB Package Cost Verification in Billing System

  Scenario: Verify B2B2C 12GB 12 months package cost is S/. 29.66 without IGV when activated
    Given the user is logged into the BSCS7 billing system
    And the B2B2C 12GB 12 months package is configured in the system
    When the user queries the parametric packages table for B2B2C 12GB 12 months
    Then the system displays the package cost as "S/. 29.66" without IGV
    And the package validity is "360" days
    When the user simulates activation of B2B2C 12GB 12 months package for a SOLD plan line
    Then the system generates an activation record with cost "S/. 29.66" without IGV
    When the user verifies the pre-billing process for the package activation
    Then the system calculates the charge as "S/. 29.66" without IGV
    When the user queries the generated monthly invoice for the B2B2C 12GB 12 months package
    Then the invoice displays the package charge as "S/. 29.66" without IGV