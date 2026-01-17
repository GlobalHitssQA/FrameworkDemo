Feature: Automatic In Pool 10MB Package Assignment on SOLD Plan Change

  Scenario: Verify automatic In Pool 10MB telemetry package assignment when line changes to SOLD plan
    Given a line is active in MANUFACTURE plan in BSCS7 system
    And the line has no In Pool package assigned
    When the user executes the plan change from MANUFACTURE to SOLD through the standard process
    Then the system processes the plan change to SOLD on the same day
    And the In Pool 10MB package is automatically assigned to the line
    And the assigned package has 10MB capacity with zero cost in UDR_LT_01
    And the package is configured for telemetry APNs APN1 and APN4
    And the line can consume telemetry data using the shared In Pool bucket