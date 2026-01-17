Feature: VoLTE Service Provisioning for MANUFACTURE Plan

  Scenario: Verify VoLTE service is correctly provisioned when activating a new line directly on MANUFACTURE plan
    Given the user has permissions to create lines in BSCS7
    And the MANUFACTURE plan is configured with VoLTE enabled
    And INSTANT LINK connectivity with RED is available
    And productive APNs are configured
    When the user creates a new GM line selecting MANUFACTURE plan in BSCS7
    Then the system creates the line with RATEPLAN MANUFACTURE and configures 10 min VOICE, 10 SMS, 100 MB inclusions correctly
    And the VoLTE service is enabled for the new line in BSCS7
    And INSTANT LINK sends SERVICE_VOLTE parameter in the initial provision to RED
    And the network elements HLR HSS IMS reflect VoLTE service enabled for the new line
    And all productive APNs APN1 APN2 APN3 APN4 APN5 APN6 APN7 are provisioned with active VoLTE