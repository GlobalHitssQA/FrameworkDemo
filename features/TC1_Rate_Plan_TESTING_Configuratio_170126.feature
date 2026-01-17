Feature: Rate Plan TESTING Configuration Verification
  As a system administrator
  I want to verify the Rate Plan TESTING configuration in BSCS7
  So that I can ensure proper provisioning for test environments

  Scenario: Verify Rate Plan TESTING is correctly configured with all required parameters
    Given I am logged into the BSCS7 system with query permissions
    When I navigate to the Rate Plan configuration section
    And I search for the Rate Plan TESTING
    Then the Rate Plan TESTING should be displayed with its unique identifier and basic parameters
    And the Rate Plan TESTING should have only pre-productive APNs APN1, APN2, APN4, APN5 and APN6 assigned
    And the Rate Plan TESTING should have APN3 and APN7 configured for eSIM profile download
    And all voice, SMS and data traffic should be configured as bulk billing without free units
    And the VoLTE service should be enabled for Rate Plan TESTING