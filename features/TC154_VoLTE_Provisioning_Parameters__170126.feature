Feature: VoLTE Provisioning Parameters in HLR/HSS

  Scenario: Verify VoLTE parameters are correctly provisioned in HLR/HSS when Instant Link sends provisioning request for a new Life Cycle RATEPLAN with VoLTE enabled
    Given a General Motors line is active in the system
    And Instant Link is configured with connectivity to HLR/HSS
    And the VoLTE configuration matrix per RATEPLAN is defined
    And the network infrastructure supports VoLTE services
    When I execute a provisioning from Instant Link for a RATEPLAN with VoLTE enabled
    Then Instant Link sends the provisioning request with SERVICE_VOLTE parameter to HLR/HSS
    And HLR/HSS registers the VoLTE provisioning request in transaction logs
    And the VoLTE parameters are correctly configured in HLR/HSS with the service enabled
    When I make a test call from the provisioned line using VoLTE technology
    Then the call is established correctly using VoLTE technology
    When I execute a provisioning to PURGED RATEPLAN without VoLTE enabled
    Then the VoLTE parameters are disabled in HLR/HSS
    And the line cannot make VoLTE calls