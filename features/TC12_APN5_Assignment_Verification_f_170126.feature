Feature: APN5 Assignment Verification for Internet Navigation

  Scenario: Verify correct APN5 (onstarhu) assignment for internet navigation with IPv4/IPv6 support and bulk billing
    Given the user is authenticated in the Life Cycle system
    And a valid line is available for provisioning
    When the user provisions a line in a productive Life Cycle plan excluding TESTING and PURGED
    Then the system registers the line in the selected plan correctly
    When the user queries the APNs assigned to the provisioned line
    Then the system displays that APN5 onstarhu is assigned to the line
    When the user verifies the APN5 configuration for internet navigation
    Then the APN5 allows FOTA navigation with IPv4 and IPv6 protocol support
    When the user validates the APN5 traffic billing configuration
    Then the APN5 traffic is billed at bulk rate of 0.2033 per MB without IGV and does not participate in the In Pool package