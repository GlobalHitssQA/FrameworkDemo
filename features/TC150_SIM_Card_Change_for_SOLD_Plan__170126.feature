Feature: SIM Card Change for SOLD Plan Line
  As a user with SIM change permissions
  I want to change the SIM card for a line on SOLD plan
  So that the line maintains its services, In Pool package and shared pool participation

  Scenario: Change SIM card maintaining SOLD plan configuration and In Pool services
    Given I am authenticated as a user with SIM change permissions
    And there is an active line on SOLD plan with existing In Pool package
    And a new SIM card is available for assignment
    When I execute the SIM change process entering the new ICCID
    Then the system accepts the SIM change request and processes the update
    And the line appears in INSTANT LINK with the new ICCID and SOLD plan
    And the APNs APN1 through APN7 are correctly configured
    And the In Pool 10MB package remains active in BSCS7 with the new ICCID
    And the line is included in the In Pool shared pool calculation
    And the VoLTE services are provisioned correctly in HLR HSS and IMS
    And the APNs APN3 and APN7 allow eSIM profile download without cost
    And the SIM change transaction is registered in SIAC Unico with all required details