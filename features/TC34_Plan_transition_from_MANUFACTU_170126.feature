Feature: Plan transition from MANUFACTURE to UNSOLD NOT IN SHOWROOM

  Scenario: Verify line transitions from MANUFACTURE to UNSOLD NOT IN SHOWROOM on the same day
    Given a line is active in MANUFACTURE plan with 10 min voice and 10 SMS and 100 MB included
    And the user has plan change permissions in BSCS7
    When the user executes the plan change from MANUFACTURE to UNSOLD NOT IN SHOWROOM in BSCS7
    Then the system processes the plan change correctly
    And the RATEPLAN is updated in BSCS7
    And the plan change is activated on the same day without waiting for billing cycle
    And the line maintains the same included services of 10 min voice and 10 SMS and 100 MB
    And all productive APNs remain enabled including APN1 through APN7
    And VoLTE remains enabled on the line
    And INSTANT LINK sends the updated RATEPLAN with SERVICE_VOLTE and APN attributes to the network