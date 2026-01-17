Feature: 5G Service Enablement Across Life Cycle Plans

  Scenario: Verify 5G service enablement through all Life Cycle RATEPLANs except PURGED
    Given a GM line is active in the system with configuration permissions in BSCS7
    And connectivity with INSTANT LINK and network is available
    And 5G support is configured in PCRF and network elements
    When I provision a line in TESTING plan
    Then the line should have 5G service enabled
    And network parameters should be provisioned correctly through INSTANT LINK
    When I change the plan from TESTING to MANUFACTURE
    Then the line in MANUFACTURE plan should maintain 5G service enabled
    When I change the plan to UNSOLD NOT IN SHOWROOM
    Then the line in UNSOLD NOT IN SHOWROOM plan should maintain 5G enabled
    When I change the plan to UNSOLD SHOWROOM
    Then the line in UNSOLD SHOWROOM plan should maintain 5G enabled
    When I change the plan to SOLD
    Then the line in SOLD plan should maintain 5G enabled
    When I change the plan to DORMANT
    Then the line in DORMANT plan should maintain 5G enabled
    When I change the plan to PURGED
    Then the line in PURGED plan should have 5G service disabled
    And the SIM should be inactive without services