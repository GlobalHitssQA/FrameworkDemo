Feature: Cancel B2B2C Package via CancelProduct API

  Scenario: Successfully cancel a B2B2C package when customer requests deactivation
    Given a user is authenticated in the system
    And an active line exists with SOLD plan and assigned B2B2C package
    And the CancelProduct API is available
    When the user invokes the CancelProduct API with the active B2B2C package parameters
    Then the API should return a successful response code
    And the B2B2C package status in BSCS7 should show as cancelled
    And the package should no longer be active for the line
    And the cancellation transaction should be recorded in SIAC Unico with date time and user
    And the cancelled B2B2C package should not appear in the next billing cycle invoice