Feature: In Pool Bag Calculation for SOLD Rate Plan

  Scenario: Shell calculates In Pool bag correctly by multiplying active SOLD lines by 10 MB
    Given the test environment has 50 General Motors lines configured in SOLD rate plan at billing cycle end
    When the user executes the Shell sh_BSCS_calculaFacturaGM to calculate the In Pool bag
    Then the system should display the assigned bag as 500 MB for the billing period
    And when the scenario is modified to 100 lines in SOLD plan and Shell is executed again
    Then the calculated bag should update to 1000 MB confirming the formula applies correctly
    And the Shell should include all lines in SOLD Rate Plan regardless of consumption