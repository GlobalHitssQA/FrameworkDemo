Feature: VoLTE Automatic Provisioning for SOLD Plan

  Scenario: Verify automatic VoLTE provisioning when activating a line on SOLD plan for General Motors Auto Conectado service
    Given the BSCS7 system is configured with SOLD plan
    And INSTANT LINK is operational
    And the network HLR HSS IMS is available
    And a valid SIM card is ready for activation
    When I activate a new line on SOLD plan Rate Plan 3 for Auto Conectado service
    Then the line should be activated correctly in BSCS7 with SOLD plan assigned
    When I verify the provisioning parameters in INSTANT LINK
    Then the SERVICE_VOLTE parameter should be sent with affirmative value
    When I query the line service configuration in the network
    Then the line should have VoLTE service enabled
    When I make a voice call using the activated SOLD plan line
    Then the call should be established using VoLTE technology