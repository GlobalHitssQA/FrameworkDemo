Feature: Instant Link APN Attributes Provisioning to Network Elements

  Scenario: Verify Instant Link sends APN attributes correctly to network elements based on RATEPLAN
    Given the user is authenticated in Instant Link with provisioning permissions
    And the 7 APNs configuration is completed in BSCS7
    And connectivity between Instant Link and network elements is established
    When the user accesses Instant Link and selects a General Motors line for provisioning
    Then the system displays the selected line available for provisioning
    When the user executes provisioning on TESTING RATEPLAN with pre-productive APNs
    Then Instant Link sends only pre-productive APN attributes APN2 APN6 APN7 to network elements
    And no productive APNs are sent for TESTING RATEPLAN
    When the user executes provisioning on a productive RATEPLAN
    Then Instant Link sends all 7 productive APN attributes to network elements
    And each APN contains correct usage classification and billing configuration
    When the user verifies the Instant Link logs for sent APN attributes
    Then the logs show correct attributes for onstarsa with Telemetry usage
    And the logs show correct attributes for gmsa with Internet Navigation FOTA usage
    And the logs show correct attributes for esim.amx with eSIM profile download usage
    And the logs show correct attributes for onstar01.v6 with Telemetry IPv6 usage
    And the logs show correct attributes for onstarhu with Navigation IPv6 usage
    And the logs show correct attributes for onstarwifi with WiFi Traffic usage
    And the logs show correct attributes for onstarsunman with eSIM profile download usage
    When the user queries network elements PCRF and HLR HSS for provisioned APNs
    Then the APNs are correctly configured in network elements with proper attributes
    When the user verifies PURGED RATEPLAN provisioning
    Then no APN attributes are sent to network elements for PURGED RATEPLAN