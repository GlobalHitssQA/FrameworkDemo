Feature: B2B2C 6GB Package 100% Consumption Notification

  Scenario: Verify automatic notification generation when B2B2C 6GB package reaches 100% consumption
    Given a test line with SOLD plan is available in the system
    And the B2B2C 6GB package is configured in BSCS7
    And the notification system is properly configured
    When I activate the B2B2C 6GB package on the test line
    Then the package should be activated with 6GB capacity and cost of S/. 16.95 without IGV
    And the package validity should be 1 month or 30 days
    When I simulate data consumption until reaching exactly 100% of the 6GB package
    Then the system should register the total consumption of 6GB
    And the system should detect that 100% threshold was reached
    When I verify the automatic notification generation for 100% consumption
    Then an automatic notification should be generated indicating the B2B2C 6GB package is fully consumed
    And the notification should contain package name B2B2C 6GB
    And the notification should contain total capacity 6GB
    And the notification should contain consumption 6GB and percentage 100%
    When I verify the notification timestamp in the system
    Then the system should store the notification generation date and time for audit
    When I validate that no duplicate notifications are generated for the same 100% event
    Then the system should prevent duplicate notification generation
    And the system should validate no previous record exists for this event