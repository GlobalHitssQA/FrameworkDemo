Feature: SMS Roaming Traffic Billing Verification for Life Cycle Plans

  Scenario: Verify SMS roaming traffic billing across all Life Cycle plans
    Given lines are configured in each Life Cycle plan TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT
    And all lines are active and correctly provisioned
    When SMS messages are sent from each line in international roaming mode
    Then the system registers SMS roaming traffic in UDR_LT_01 table for each line
    When the billing process is executed
    Then SMS roaming traffic is charged at bulk rate of 0.05 per message without IGV
    And the consolidated GM invoice includes SMS roaming traffic in Traffic Detail section
    And the invoice shows correct amount calculated at bulk rate