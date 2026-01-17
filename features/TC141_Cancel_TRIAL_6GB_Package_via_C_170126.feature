Feature: Cancel TRIAL 6GB Package via CancelProduct API

  Scenario: Successfully cancel TRIAL 6GB package when customer requests deactivation
    Given the user is authenticated in the system
    And there is an active line with SOLD plan and TRIAL 6GB package assigned
    And the CancelProduct API is available
    When the user invokes the CancelProduct API with TRIAL 6GB package parameters
    Then the API should return a successful response code
    And the TRIAL 6GB package should appear as cancelled in BSCS7
    And the package should no longer be active for the line
    And the cancellation transaction should be registered in SIAC Unico with date time and user