Feature: Voice traffic billing in Roaming for Life Cycle plans
  As a billing system administrator
  I want to verify voice traffic charges in Roaming
  So that GM lines are billed correctly when making calls outside the country

  Scenario: Verify voice traffic billing in Roaming for all Life Cycle plans
    Given GM lines are configured in each Life Cycle plan
    And the lines are active and correctly provisioned
    When voice calls are made from each line in international Roaming mode
    Then the system registers voice traffic in Roaming in the UDR_LT_01 table
    And the billing process is executed
    And voice traffic in Roaming is charged at bulk rate of 0.07 per minute without IGV
    And the consolidated GM invoice includes voice traffic in Roaming section
    And the invoice shows correct amount calculated at bulk rate