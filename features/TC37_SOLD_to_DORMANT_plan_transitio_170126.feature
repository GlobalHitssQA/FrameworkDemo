Feature: SOLD to DORMANT plan transition on same day

  Scenario: Verify line state transition from SOLD to DORMANT plan on the same day of request
    Given a line is active in SOLD plan with In Pool 10MB package assigned for APN1 and APN4
    And the line has In Pool mode active for telemetry and bulk traffic for other services
    When the user executes the plan change from SOLD to DORMANT via BSCS7
    Then the system processes the plan change correctly and updates the RATEPLAN to DORMANT in BSCS7
    And the DORMANT plan is activated immediately on the same day without waiting for billing cycle
    And the In Pool package is removed and all traffic switches to bulk mode without included data
    And all traffic including VOICE SMS and DATA is charged at bulk rate without included allowances
    And VoLTE remains enabled for the line
    And INSTANT LINK sends the DORMANT RATEPLAN with SERVICE_VOLTE to the network
    And all productive APNs APN1 APN2 APN3 APN4 APN5 APN6 APN7 are active in the network