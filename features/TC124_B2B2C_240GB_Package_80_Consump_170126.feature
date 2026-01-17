Feature: B2B2C 240GB Package 80% Consumption Alert Notification

  Scenario: Verify automatic early warning notification is generated when a line consumes 80% of B2B2C 240GB package with 12 months validity
    Given a test line is active on SOLD plan
    And the B2B2C 240GB package is configured in BSCS7 with cost 296.61 PEN without IGV
    And the notification system is operational
    And the threshold detection mechanism is working correctly
    When I activate a B2B2C 240GB package on the test line with 12 months validity
    Then the B2B2C 240GB package is activated with 240 GB capacity and cost 296.61 PEN and 360 days validity
    When I simulate data consumption until reaching 80% of the package which is 192 GB of 240 GB
    Then the system registers accumulated consumption of 192 GB and detects the 80% threshold
    And the system automatically generates the 80% alert notification
    And the notification displays package name B2B2C 240GB and total capacity 240GB and current consumption 192GB and percentage 80% and remaining validity
    And the system stores the exact timestamp of notification generation for traceability and audit
    And the system prevents duplicate notifications verifying no previous 80% notification exists for this active package