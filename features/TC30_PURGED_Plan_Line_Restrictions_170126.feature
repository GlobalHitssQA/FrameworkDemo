Feature: PURGED Plan Line Restrictions
  As a system administrator
  I want to verify that a line in PURGED plan cannot consume any services
  So that purged lines remain completely inactive

  Background:
    Given the user is authenticated in the system
    And the PURGED plan is configured in BSCS7 without services
    And a line is available for provisioning in PURGED state

  Scenario: Verify that a PURGED plan line cannot perform any consumption or access services
    Given a line is provisioned in the PURGED plan
    Then the line should be in PURGED state without enabled services
    And the line should have no productive APNs or VoLTE
    When the user attempts to make a voice call from the PURGED plan line
    Then the system should block the call attempt
    And no voice calls should be allowed
    When the user attempts to send an SMS from the PURGED plan line
    Then the system should block the SMS sending
    And no consumption should be registered
    When the user attempts to consume data or download eSIM profile from the PURGED plan line
    Then the system should block data access
    And no navigation or eSIM profile download should be allowed
    When the user verifies the SIM status
    Then the SIM should be shown as inactive
    And no services should be available in the PURGED plan