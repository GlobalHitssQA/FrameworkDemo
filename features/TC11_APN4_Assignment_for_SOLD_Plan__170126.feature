Feature: APN4 Assignment for SOLD Plan Telemetry Traffic

  Scenario: Verify correct APN4 (Onstar01.v6) assignment for IPv6 telemetry traffic on SOLD plan lines
    Given the user is authenticated in the provisioning system
    And a valid line is available for provisioning or plan change
    When the user provisions a line in the SOLD plan RatePlan3
    Then the system registers the line in the SOLD plan correctly
    When the user verifies the APN configuration assigned to the provisioned line
    Then the system shows that APN4 Onstar01.v6 is assigned to the line
    When the user validates the APN4 configuration for IPv6 telemetry traffic
    Then the APN4 allows telemetry traffic with IPv6 protocol
    When the user verifies that APN4 participates in the In Pool modality with APN1
    Then the APN4 traffic is counted within the shared In Pool bag of 10MB