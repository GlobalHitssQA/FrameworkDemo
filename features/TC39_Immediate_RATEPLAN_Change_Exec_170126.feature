Feature: Immediate RATEPLAN Change Execution
  As a system administrator
  I want to verify that RATEPLAN changes execute immediately
  So that customers don't have to wait for the billing cycle

  Scenario: RATEPLAN change executes on the same day of the request
    Given I record the current system date and time before requesting the plan change
    When I execute a plan change from source RATEPLAN to destination RATEPLAN in BSCS7
    Then the system processes the plan change request successfully
    And I verify in BSCS7 that the RATEPLAN was updated immediately
    And the new plan activation date matches the request date
    And all new RATEPLAN attributes including services APNs and VoLTE are active on the same day