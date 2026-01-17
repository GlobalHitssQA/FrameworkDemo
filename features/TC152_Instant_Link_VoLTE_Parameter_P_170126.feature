Feature: Instant Link VoLTE Parameter Provisioning for Life Cycle RATEPLANs

  Scenario: Verify Instant Link sends SERVICE_VOLTE parameter correctly when provisioning a line with VoLTE enabled RATEPLAN
    Given the user is authenticated in Instant Link with provisioning permissions
    And there is connectivity between Instant Link and network elements HLR HSS and IMS
    And VoLTE is configured as enabled in the Life Cycle RATEPLAN matrix except for PURGED
    And there is an active General Motors line in the system
    When the user accesses Instant Link and selects a General Motors line for provisioning
    And the user selects a RATEPLAN with VoLTE enabled from the options TESTING MANUFACTURE UNSOLD_NOT_IN_SHOWROOM UNSOLD_SHOWROOM SOLD or DORMANT
    And the user executes the provisioning action for the selected RATEPLAN
    Then Instant Link should process the request and generate the provisioning transaction including SERVICE_VOLTE parameter
    And the SERVICE_VOLTE parameter should appear in Instant Link logs sent to network elements with enabled value
    And the VoLTE service should be correctly provisioned in HLR HSS and IMS for the line
    When the user attempts to provision a line with PURGED RATEPLAN
    Then the SERVICE_VOLTE parameter should not be sent for PURGED RATEPLAN
    And the VoLTE service should remain disabled in network elements for PURGED lines