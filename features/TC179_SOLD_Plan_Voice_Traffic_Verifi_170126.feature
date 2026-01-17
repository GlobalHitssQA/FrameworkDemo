Feature: SOLD Plan Voice Traffic Verification
  As a billing system user
  I want to verify voice traffic charges on SOLD plan
  So that calls are correctly billed at bulk rate without included minutes

  Scenario: Verify local and roaming voice traffic charges on SOLD plan without included minutes
    Given a line is provisioned on SOLD plan with VoLTE service enabled
    And the SOLD plan has no included voice minutes
    When the user generates 80 minutes of local voice traffic during the billing cycle
    Then the system should register 80 minutes consumption in the traffic table
    And all 80 minutes should be charged at bulk rate without deducting included minutes
    And the system should generate a charge of S/. 5.60 excluding IGV for 80 minutes at S/. 0.07 per minute
    When the user generates 15 minutes of roaming voice traffic
    Then the system should register 15 minutes of roaming consumption
    And the system should generate a charge of S/. 1.05 excluding IGV for 15 roaming minutes at S/. 0.07 per minute