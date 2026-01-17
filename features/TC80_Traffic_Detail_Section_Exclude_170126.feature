Feature: Traffic Detail Section Excludes Telemetry Traffic for SOLD Plan Lines

  Scenario: Verify Traffic Detail section only shows non-telemetry APNs for SOLD plan lines
    Given the user is authenticated in BSCS7
    And there are active lines in SOLD plan with consumption from different APNs
    And the In Pool calculation shell has been executed
    When the user generates an invoice for General Motors client with SOLD plan lines
    And the user navigates to the Traffic Detail section of the generated invoice
    Then the system should display only traffic from APN2 gmsa for SOLD lines
    And the system should display only traffic from APN5 onstarbu for SOLD lines
    And the system should display only traffic from APN6 onstarwifi for SOLD lines
    And the system should not display telemetry traffic from APN1 onstarsa for SOLD lines
    And the system should not display telemetry traffic from APN4 onstar01.v6 for SOLD lines
    And the Traffic Detail SOLD section should exist with telemetry traffic summary