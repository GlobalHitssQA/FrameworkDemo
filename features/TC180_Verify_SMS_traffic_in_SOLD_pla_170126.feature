Feature: Verify SMS traffic in SOLD plan for local and roaming messages without included SMS

  Scenario: Validate SMS charges at bulk rate for local and roaming messages in SOLD plan
    Given a line is provisioned in the SOLD plan with SMS service enabled and no SMS included
    When the user sends 60 local SMS messages during the billing cycle
    Then the system should register 60 SMS in the traffic table
    And all 60 SMS should be charged at bulk rate without deducting included SMS
    And the system should generate a charge of 3.00 soles without IGV for 60 local SMS at 0.05 per message
    When the user sends 8 roaming SMS messages
    Then the system should register 8 roaming SMS in the traffic table
    And the system should generate a charge of 0.40 soles without IGV for 8 roaming SMS at 0.05 per message