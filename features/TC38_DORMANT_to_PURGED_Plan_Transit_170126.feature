Feature: DORMANT to PURGED Plan Transition
  As a user with plan change permissions in BSCS7
  I want to change a line from DORMANT plan to PURGED plan
  So that all services are disabled on the same day of request

  Scenario: Verify state transition when line changes from DORMANT to PURGED disabling all services same day
    Given the line is in DORMANT state with all bulk traffic and VoLTE enabled
    When I execute the plan change from DORMANT to PURGED through BSCS7
    Then the system processes the plan change correctly and updates RATEPLAN to PURGED
    And the plan change is executed on the same day of the request
    And the SIM is inactive with no services no APNs and VoLTE disabled
    And INSTANT LINK provisions RATEPLAN PURGED without services or APNs to the network