Feature: Plan Transition from UNSOLD-SHOWROOM to SOLD with In Pool

  Scenario: Verify line transition from UNSOLD-SHOWROOM to SOLD with In Pool modality on same day
    Given a GM line is active with UNSOLD-SHOWROOM plan with 100 min voice and 100 SMS and 2 GB included
    And the line has productive APNs enabled
    When the user executes plan change from UNSOLD-SHOWROOM to SOLD in BSCS7
    Then the system processes the plan change correctly
    And the RATEPLAN is updated to SOLD in BSCS7
    And the plan change is executed on the same day of the request
    And the SOLD plan is activated immediately without waiting for billing cycle
    And the included allowances are removed from the line
    And the In Pool 10 MB package is activated for telemetry on APN1 and APN4
    And the line has bulk traffic except for APN1 and APN4 using In Pool modality
    And VoLTE is enabled on the line
    And INSTANT LINK provisions the SOLD RATEPLAN with SERVICE_VOLTE correctly
    And the In Pool package is automatically assigned to the line without manual intervention