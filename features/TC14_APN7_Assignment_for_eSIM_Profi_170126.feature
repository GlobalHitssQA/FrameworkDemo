Feature: APN7 Assignment for eSIM Profile Download

  Scenario: Verify correct APN7 assignment for eSIM profile download without cost in productive plans
    Given the user is authenticated in the Life Cycle system
    And a valid line is available for provisioning
    When the user provisions a line in a new Life Cycle plan except PURGED
    Then the system registers the line in the selected plan correctly
    When the user queries the APNs assigned to the provisioned line
    Then the system shows that APN7 onstarunman is assigned to the line
    And the APN7 is configured for eSIM profile download
    When the user validates the APN7 traffic cost
    Then the APN7 traffic is registered with zero cost in billing
    And the APN7 is available in productive plans and not in preproductive test plans