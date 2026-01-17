Feature: B2B2C 720GB Package 100% Consumption Notification

  Scenario: Verify automatic notification is generated when B2B2C 720GB package reaches 100% consumption
    Given a test line with SOLD plan is active
    And a B2B2C 720GB package is created with cost 830.51 PEN without tax and 36 months validity
    And the notification system is configured for 80% and 100% thresholds
    When I activate the B2B2C 720GB package on the test line
    Then the package should be activated with 720 GB capacity and 1080 days validity
    When I simulate data consumption until reaching exactly 100% of the 720 GB total
    Then the system should register the accumulated consumption of 720 GB
    And the system should detect the 100% threshold has been reached
    When I verify the automatic notification generation for 100% depletion
    Then an automatic notification should be generated informing the B2B2C 720GB package is completely consumed
    And the notification should contain package name B2B2C 720GB
    And the notification should contain total capacity 720GB
    And the notification should contain total consumption 720GB
    And the notification should contain percentage 100%
    And the notification should contain the depletion date
    When I verify the notification generation timestamp
    Then the system should register the complete timestamp for audit purposes
    When I validate no duplicate notifications are generated
    Then the system should validate uniqueness and not generate duplicate notifications for the same depletion event