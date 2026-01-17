Feature: Verify Roaming data traffic charges across Life Cycle plans

  Scenario: Verify roaming data charges are applied correctly for GM lines in all Life Cycle plans
    Given GM lines are active and provisioned in each Life Cycle plan
    And roaming data rate configuration is active at 0.2033 PEN per MB without tax
    When data consumption is generated from each line in international roaming mode
    Then the system registers roaming data traffic in UDR_LT_01 table for each line
    And the billing process applies bulk rate charges for roaming data traffic
    And the consolidated GM invoice displays roaming data traffic details in the corresponding section
    And the invoice shows correct amounts calculated at bulk rate