Feature: TRIAL 6GB Package 80% Consumption Notification
  As a system administrator
  I want the system to generate automatic notifications when consumption reaches 80%
  So that users are informed about their data usage

  Scenario: Verify automatic notification generation when TRIAL 6GB package reaches 80% consumption
    Given a user has an active GM line with SOLD plan
    And the TRIAL 6GB package is configured
    And the notification system at 80% is configured and operational
    When I activate a TRIAL 6GB package on the SOLD plan line
    Then the TRIAL 6GB package should be activated with 6GB available
    When I consume 4.7GB of the TRIAL 6GB package
    Then the package should register 4.7GB consumption without triggering threshold notification
    When I consume an additional 0.1GB to reach exactly 4.8GB consumed
    Then the system should detect that 80% consumption threshold was reached
    And the system should generate and send automatic notification about 80% consumption
    And the notification should display TRIAL 6GB package name and 80% consumed percentage
    And the system should log audit record with date time and notification details