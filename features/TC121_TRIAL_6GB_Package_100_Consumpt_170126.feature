Feature: TRIAL 6GB Package 100% Consumption Notification

  Scenario: Verify automatic notification is generated when a line consumes 100% of the TRIAL 6GB package
    Given a user has an active line with SOLD plan
    And the TRIAL 6GB package is configured in BSCS7
    And the notification system is configured for 80% and 100% thresholds
    When I activate a TRIAL 6GB package on a test line with SOLD plan
    Then the TRIAL 6GB package is activated successfully with 6 GB capacity and 90 days validity
    When I simulate data consumption until reaching exactly 100% of the 6 GB package
    Then the system registers the complete 6 GB consumption and detects the 100% threshold reached
    And the system automatically generates a 100% consumption notification
    And the notification contains the package name TRIAL 6GB and capacity 6GB and 100% consumption
    And the notification is registered with generation date and time for auditing