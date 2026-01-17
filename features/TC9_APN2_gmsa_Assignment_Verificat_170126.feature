Feature: APN2 gmsa Assignment Verification for Productive Rate Plans

  Scenario: Verify APN2 gmsa is correctly assigned to lines across all productive rate plans
    Given the user has access to INSTANT LINK with query permissions
    And the productive Rate Plans are created
    And APN2 gmsa is configured in the network
    When the user provisions a line in Rate Plan TESTING
    Then the system should display APN2 Gmsapp assigned in pre-productive mode
    When the user provisions a line in Rate Plan MANUFACTURE
    Then the system should display APN2 gmsa assigned for Internet navigation FOTA and infotainment
    When the user provisions a line in Rate Plan UNSOLD NOT IN SHOWROOM
    Then the system should display APN2 gmsa correctly assigned and active
    When the user provisions a line in Rate Plan UNSOLD SHOWROOM
    Then the system should display APN2 gmsa correctly assigned and active
    When the user provisions a line in Rate Plan SOLD
    Then the system should display APN2 gmsa assigned with bulk modality without In Pool participation
    When the user provisions a line in Rate Plan DORMANT
    Then the system should display APN2 gmsa correctly assigned
    When the user verifies bulk billing configuration for APN2 gmsa
    Then the system should display bulk billing configuration with package assignment enabled