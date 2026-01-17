Feature: Line Plan Transition from TESTING to MANUFACTURE

  Scenario: Verify state transition when a line changes from TESTING to MANUFACTURE plan on the same day
    Given a GM line is active in TESTING plan with pre-productive APNs
    When the user executes the plan change from TESTING to MANUFACTURE in BSCS7
    Then the system processes the plan change and updates the RATEPLAN in BSCS7
    And the MANUFACTURE plan is activated immediately on the same day
    And the APNs change to productive mode with correct included allowances
    And INSTANT LINK provisions the new RATEPLAN and VoLTE parameters to the network