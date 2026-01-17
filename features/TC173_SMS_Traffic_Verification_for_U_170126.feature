Feature: SMS Traffic Verification for UNSOLD - SHOWROOM Plan

  Scenario: Verify SMS traffic billing for local and roaming messages in UNSOLD - SHOWROOM plan
    Given the user is authenticated in the system
    And the UNSOLD - SHOWROOM plan is configured in BSCS7
    And the SMS service is enabled with correct tariffs
    When the user provisions a line in the UNSOLD - SHOWROOM plan
    Then the line should be provisioned correctly in the UNSOLD - SHOWROOM plan
    When the user sends 120 local SMS messages during the billing cycle
    Then the system should register 120 SMS in the traffic table
    And the system should discount 100 SMS included in the plan
    And the system should mark 20 SMS as excess
    When the user validates the excess charge for 20 SMS at bulk rate of 0.05 per message
    Then the system should generate a charge of 1.00 without IGV for the 20 SMS excess
    When the user sends 5 roaming SMS messages
    Then the system should charge 5 roaming SMS at bulk rate of 0.05 per message
    And the system should generate a charge of 0.25 without IGV for roaming SMS