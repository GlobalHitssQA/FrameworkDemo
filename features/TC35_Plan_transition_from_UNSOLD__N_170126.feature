Feature: Plan transition from UNSOLD - NOT IN SHOWROOM to UNSOLD - SHOWROOM

  Scenario: Verify same-day plan transition from UNSOLD - NOT IN SHOWROOM to UNSOLD - SHOWROOM
    Given a GM line is active with plan UNSOLD - NOT IN SHOWROOM with 10 min voice, 10 SMS, 100 MB and productive APNs enabled
    When the user executes the plan change from UNSOLD - NOT IN SHOWROOM to UNSOLD - SHOWROOM in BSCS7
    Then the system processes the plan change correctly and updates the RATEPLAN in BSCS7
    And the plan UNSOLD - SHOWROOM is activated immediately on the same day without waiting for billing cycle
    And the line has new included services of 100 min voice, 100 SMS, 2 GB with all productive APNs and VoLTE enabled
    And INSTANT LINK correctly sends the RATEPLAN UNSOLD - SHOWROOM with SERVICE_VOLTE and APN attributes to the network