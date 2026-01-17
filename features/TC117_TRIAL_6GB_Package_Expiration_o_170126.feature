Feature: TRIAL 6GB Package Expiration on Full Consumption

  Scenario: Verify TRIAL 6GB package expires automatically when consuming all 6GB before 90 days
    Given a user with an active GM line on SOLD plan
    And a TRIAL 6GB package is configured with notifications at 80% and 100%
    When the user activates a TRIAL 6GB package on the line
    Then the TRIAL 6GB package should be activated with 6GB available
    When the user consumes 5GB of the TRIAL 6GB package
    Then the package should register 5GB consumption with 1GB remaining
    And the system should generate an automatic notification at 80% consumption
    When the user consumes the remaining 1GB to exhaust the package
    Then the TRIAL 6GB package should register total consumption of 6GB
    And the system should automatically mark the TRIAL 6GB package as exhausted and expired
    And the system should generate an automatic notification for 100% consumption