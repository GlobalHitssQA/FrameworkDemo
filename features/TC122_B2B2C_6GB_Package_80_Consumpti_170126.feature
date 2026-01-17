Feature: B2B2C 6GB Package 80% Consumption Alert Notification

  Scenario: System generates automatic early alert notification when line consumes 80% of B2B2C 6GB package
    Given a user with an active line on SOLD plan exists
    And the B2B2C 6GB package is configured in BSCS7 with cost 16.95 PEN without VAT
    And the notification system is operational and configured for 80% and 100% thresholds
    When I activate a B2B2C 6GB package on the test line with 1 month validity
    Then the B2B2C 6GB package is activated with 6GB capacity and 30 days validity
    When I simulate data consumption until reaching exactly 80% of the package which is 4.8GB
    Then the system registers 4.8GB consumption and detects the 80% threshold reached
    And the system automatically generates the 80% consumption alert notification
    And the notification displays package name B2B2C 6GB with capacity 6GB and current consumption 4.8GB at 80%
    And the system records the exact date and time of notification generation
    And the system validates no duplicate notifications are generated for the same 80% consumption event