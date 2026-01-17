Feature: End-to-end connectivity validation for APN1 telemetry traffic

  Scenario: Verify end-to-end connectivity of APN1 (onstarsa) for telemetry traffic from GM vehicle to destination server
    Given a General Motors line is provisioned in RATEPLAN SOLD with APN1 enabled for In Pool telemetry
    When the vehicle device establishes a data session using APN1 for telemetry traffic
    Then the HLR HSS should show successful authentication for the APN1 data session
    And the PCRF should apply In Pool policies for APN1 telemetry traffic
    And the GGSN PGW should route APN1 traffic to the GM telemetry server
    And the GM telemetry server should receive the data sent from the vehicle
    And BSCS7 should register the APN1 data consumption for In Pool billing