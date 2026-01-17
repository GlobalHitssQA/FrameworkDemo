Feature: Traffic Detail SOLD Section Validation

  Scenario: Verify Traffic Detail SOLD section displays only telemetry consumption for APN1 and APN4
    Given the user has access to the billing system
    And the user is on the General Motors consolidated invoice for the current cycle
    When the user navigates to the Traffic Detail SOLD section
    Then the Traffic Detail SOLD section should be displayed
    And only APN1 Onstarsa and APN4 Onstar01v6 should be listed
    And the MB volume consumed should be displayed for each telemetry APN
    And APN2 APN5 and APN6 should not appear in the section