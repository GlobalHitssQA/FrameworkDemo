Feature: APN5 End-to-End Connectivity Verification for FOTA Navigation

  Scenario: Verify APN5 (onstarlhu) dual stack IPv4/IPv6 connectivity for FOTA infrastructure
    Given the user is authenticated in the system
    And the network has dual stack support configured
    And PCRF has policies configured for APN5
    And Instant Link is operational
    And BSCS7 is available
    When the user provisions a line with UNSOLD SHOWROOM plan with APN5 configured
    Then the line should be provisioned correctly with APN5 for dual stack IPv4/IPv6 navigation
    When the user verifies APN5 assignment in BSCS7
    Then the system should display APN5 associated with IPv4 and IPv6 support
    When the user initiates a data session via APN5 with IPv4 protocol
    Then the system should establish the IPv4 session correctly via APN5
    When the user performs FOTA navigation traffic through APN5 with IPv4
    Then the traffic should flow correctly and be recorded with the corresponding bulk rate
    When the user initiates a data session via APN5 with IPv6 protocol
    Then the system should establish the IPv6 session correctly via APN5
    When the user performs FOTA navigation traffic through APN5 with IPv6
    Then the traffic should flow correctly and be recorded with the corresponding bulk rate for IPv6