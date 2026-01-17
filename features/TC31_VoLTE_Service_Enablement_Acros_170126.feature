Feature: VoLTE Service Enablement Across Life Cycle Plans

  Scenario: Verify VoLTE service enablement across all Life Cycle RATEPLANs except PURGED
    Given a GM line is provisioned in TESTING plan with VoLTE enabled in BSCS7
    And the SERVICE_VOLTE parameter is sent correctly to HLR/HSS/IMS via INSTANT LINK
    When the plan is changed from TESTING to MANUFACTURE
    Then the VoLTE service should remain enabled
    When the plan is changed to UNSOLD - NOT IN SHOWROOM
    Then the VoLTE service should remain enabled
    When the plan is changed to UNSOLD - SHOWROOM
    Then the VoLTE service should remain enabled
    When the plan is changed to SOLD
    Then the VoLTE service should remain enabled
    When the plan is changed to DORMANT
    Then the VoLTE service should remain enabled
    When the plan is changed to PURGED
    Then the VoLTE service should be disabled
    And the SIM should be inactive without services