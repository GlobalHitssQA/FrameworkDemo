Feature: Verify telemetry traffic by APN1 in SOLD plan with In Pool bag

  Scenario: Multiple lines consume data within the assigned In Pool bag
    Given 50 lines are provisioned in SOLD plan with APN1 configured for telemetry
    And the In Pool bag is calculated as 500 MB for the group
    When 400 MB of telemetry traffic is generated through APN1 distributed among the 50 lines
    And the In Pool calculation Shell is executed before pre-billing
    Then the system generates the OCC "Servicio In Pool" with amount S/. 65.00
    And the system does not generate the OCC "Servicio In Pool Granel" because there is no excess