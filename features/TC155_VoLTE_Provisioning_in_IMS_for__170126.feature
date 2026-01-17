Feature: VoLTE Provisioning in IMS for Life Cycle RATEPLAN

  Scenario: Verify VoLTE parameters are correctly provisioned in IMS when Instant Link sends provisioning request
    Given the General Motors line is active and provisioned in the system
    And Instant Link has connectivity to IMS
    And the IMS infrastructure is operational and configured for VoLTE services
    When the user executes a provisioning request from Instant Link for a RATEPLAN with VoLTE enabled
    Then Instant Link sends the provisioning request with VoLTE parameters to IMS
    And IMS logs the VoLTE provisioning request with timestamp and line data
    When the user queries the VoLTE parameters in IMS configuration tables for the General Motors line
    Then the VoLTE parameters are correctly configured in IMS with enabled service profile
    And the configuration includes codecs priorities QoS and call policies
    When the user makes a test VoLTE call from the provisioned line to another destination
    Then the call is established successfully via IMS using VoLTE technology
    And the call has HD voice quality and is correctly logged in IMS
    When the user executes a provisioning request to PURGED RATEPLAN without VoLTE services
    Then the VoLTE parameters are disabled in IMS
    And the line cannot establish calls using VoLTE technology