Feature: Voice traffic verification for UNSOLD SHOWROOM plan

  Scenario: Verify local and roaming voice traffic consumption and charges
    Given a line is provisioned in the UNSOLD SHOWROOM plan with VoLTE enabled
    When the user generates 120 minutes of local voice traffic during the billing cycle
    Then the system should record 120 minutes consumption in the traffic table
    And the system should deduct 100 included minutes from the plan
    And the system should mark 20 minutes as excess consumption
    When the excess of 20 minutes is validated for bulk rate charging
    Then the system should generate a charge of 1.40 soles without IGV for the excess
    When the user generates 10 minutes of roaming voice traffic
    Then the system should charge 10 roaming minutes at bulk rate of 0.07 soles per minute
    And the system should generate a roaming charge of 0.70 soles without IGV