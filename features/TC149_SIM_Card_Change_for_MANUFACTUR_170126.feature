Feature: SIM Card Change for MANUFACTURE Plan Line

  Scenario: Verify SIM card change for a MANUFACTURE plan line maintaining service configuration and parameters
    Given the user is authenticated with SIM change permissions
    And an active line exists with MANUFACTURE plan
    And a new SIM card is available
    When the user executes the SIM change process entering the new ICCID
    Then the system accepts the SIM change request and processes the update
    And the line appears in INSTANT LINK with new ICCID and MANUFACTURE plan
    And the APNs APN1 through APN7 are configured correctly
    And the BSCS7 Free Units remain configured with 10 min VOICE, 10 SMS and 100 MB
    And the VoLTE services are provisioned correctly in HLR, HSS and IMS
    And the APNs APN3 and APN7 allow eSIM profile download without cost
    And the SIM change transaction is registered in SIAC Unico with timestamp, user, previous ICCID and new ICCID