Feature: Verify TRIAL 6GB package cost in billing system

  Scenario: Validate TRIAL 6GB package cost is S/. 7.58 without IGV when activated for a line
    Given the user is logged into the BSCS7 billing system
    And the TRIAL 6GB package exists in the system
    When the user queries the TRIAL 6GB package cost in the parametric table
    Then the system should display the cost as "S/. 7.58" without IGV
    When the user simulates the activation of TRIAL 6GB package for a SOLD plan line
    Then the system should generate an activation record with cost "S/. 7.58" without IGV
    When the user verifies the pre-billing process for the TRIAL 6GB package activation
    Then the system should calculate the charge as "S/. 7.58" without IGV
    When the user queries the monthly invoice for the TRIAL 6GB package concept
    Then the invoice should display the TRIAL 6GB package charge as "S/. 7.58" without IGV