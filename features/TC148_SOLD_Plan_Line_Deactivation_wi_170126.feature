Feature: SOLD Plan Line Deactivation with In Pool Services Deprovisioning

  Scenario: Verify line deactivation in SOLD plan with correct deprovisioning of services, In Pool packages and shared pool update
    Given a user with line deactivation permissions is authenticated
    And an active line exists in SOLD plan with active In Pool package
    And connection to INSTANT LINK, BSCS7 and active network is established
    And In Pool calculation Shell is implemented
    When the user executes the line deactivation process for the SOLD plan line with active In Pool package
    Then the system accepts the deactivation request and processes the line deprovisioning
    And the line appears as inactive in INSTANT LINK with deactivated services and 7 APNs unconfigured
    And in BSCS7 the In Pool 10MB package associated to the line appears cancelled and no longer participates in calculations
    And the In Pool calculation Shell excludes the deactivated line in the next shared pool calculation
    And proportional billing is generated for In Pool consumption until the deactivation date
    And VoLTE services are deactivated in network systems HLR, HSS and IMS with SERVICE_VOLTE parameter removed
    And the line deactivation is typified in SIAC Unico with date, time, user and SOLD plan