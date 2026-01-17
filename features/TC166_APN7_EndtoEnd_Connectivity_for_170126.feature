Feature: APN7 End-to-End Connectivity for eSIM Profile Download in Preproductive Mode

  Scenario: Verify APN7 vodafarusman connectivity for eSIM profile download in preproductive environment
    Given the user is authenticated in the system
    And the network is configured with preproductive environment
    And Instant Link is operational
    And BSCS7 is available
    And a device with eSIM capability is ready
    And the TESTING plan is active
    When the user provisions a line with TESTING plan and preproductive APN7 vodafarusman
    Then the line should be provisioned correctly with preproductive APN7 configured
    When the user verifies in BSCS7 that APN7 vodafarusman is assigned as preproductive to the line
    Then the system should display APN7 associated with preproductive status
    When the user initiates a data session via APN7 for eSIM profile download from the device
    Then the system should establish the data session correctly via preproductive APN7
    When the user downloads the eSIM profile through APN7 in preproductive environment
    Then the eSIM profile should be downloaded successfully in the test environment
    When the user verifies that the download traffic via APN7 has zero cost for GM
    Then the system should register the traffic with zero cost according to preproductive configuration