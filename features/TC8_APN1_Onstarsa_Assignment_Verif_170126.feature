Feature: APN1 Onstarsa Assignment Verification in Life Cycle Rate Plans

  Scenario: Verify APN1 Onstarsa assignment across all Rate Plans except PURGED
    Given the user has access to INSTANT LINK with query permissions
    And all Life Cycle Rate Plans are created
    And APN1 Onstarsa is configured in the network
    When the user provisions a line in Rate Plan TESTING
    Then the system displays APN1 Onstarsa assigned to the line in pre-productive mode
    When the user provisions a line in Rate Plan MANUFACTURE
    Then the system displays APN1 Onstarsa assigned with productive classification for telemetry
    When the user provisions a line in Rate Plan UNSOLD NOT IN SHOWROOM
    Then the system displays APN1 Onstarsa correctly assigned and active
    When the user provisions a line in Rate Plan UNSOLD SHOWROOM
    Then the system displays APN1 Onstarsa correctly assigned and active
    When the user provisions a line in Rate Plan SOLD
    Then the system displays APN1 Onstarsa assigned with In Pool configuration active
    When the user provisions a line in Rate Plan DORMANT
    Then the system displays APN1 Onstarsa correctly assigned
    When the user provisions a line in Rate Plan PURGED
    Then the system displays no APN assigned to the line