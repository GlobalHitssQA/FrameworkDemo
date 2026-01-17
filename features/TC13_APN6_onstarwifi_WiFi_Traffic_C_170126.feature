Feature: APN6 onstarwifi WiFi Traffic Configuration and Billing

  Scenario: Verify correct assignment of APN6 for WiFi traffic with bulk billing and additional packages
    Given the user is authenticated in the Life Cycle system
    And a valid line is available for provisioning
    When the user provisions a line in a productive Life Cycle plan excluding TESTING and PURGED
    Then the system should register the line in the selected plan correctly
    When the user queries the productive APNs assigned to the line
    Then the system should display that APN6 onstarwifi is assigned to the line
    And the APN6 should be configured for WiFi traffic
    When the user validates the billing configuration for APN6 traffic
    Then the APN6 traffic should be billed at bulk rate of 0.2033 PEN per MB without IGV
    And the APN6 should allow activation of Trial and B2B2C packages
    When the user verifies the In Pool participation status for APN6
    Then the APN6 traffic should not be counted in the shared In Pool allowance