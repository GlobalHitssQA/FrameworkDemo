Feature: APN3 End-to-End Connectivity for eSIM Profile Download

  Scenario: Verify APN3 connectivity for eSIM profile download when a line requires eSIM provisioning
    Given a user is authenticated in the system
    And the network components HLR HSS IMS PCRF are configured
    And Instant Link is operational
    And BSCS7 is available
    And a device with eSIM capability is ready
    When the user provisions a line with TESTING plan and preproductive APN3 vodafarusman
    Then the line should be provisioned correctly with APN3 preproductive configured
    When the user verifies APN3 assignment in BSCS7
    Then the system should display the corresponding APN3 associated with the line
    When the user initiates a data session through APN3 for eSIM profile download
    Then the system should establish the data session correctly through APN3
    When the user downloads the eSIM profile through APN3
    Then the eSIM profile should download successfully without cost for GM
    When the user verifies the eSIM profile download traffic in billing
    Then the system should register the traffic with zero cost according to configuration