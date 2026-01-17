Feature: Line Deactivation for TESTING Plan

  Scenario: Verify line deactivation in TESTING plan with correct service deprovisioning and status update
    Given a user with line deactivation permissions is authenticated
    And an active line exists in TESTING plan
    And connection to INSTANT LINK, BSCS7 and active network is established
    When the user executes the line deactivation process for the TESTING plan line
    Then the system accepts the deactivation request and processes the line deprovisioning
    And the line appears as inactive in INSTANT LINK with deactivated services and unconfigured APNs
    And in BSCS7 the line has inactive status and proportional billing is generated if applicable
    And VoLTE services are deactivated in HLR, HSS and IMS network systems
    And the SERVICE_VOLTE parameter is removed
    And the deactivation transaction is registered in SIAC Unico with date, time, user and TESTING plan