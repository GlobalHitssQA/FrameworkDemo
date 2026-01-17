Feature: Package Queue Consumption Management
  As a user with a GM line on an active SOLD plan
  I want to verify that only one active package is consumed at a time
  So that queued packages remain unconsumed until the active one finishes

  Scenario: Verify sequential package consumption with queue system
    Given a user has an active GM line on SOLD plan
    And the queue system is operational in BSCS7
    When I activate a B2B2C package of 6GB on the line
    Then the B2B2C 6GB package should be marked as active for consumption
    When I activate a second B2B2C package of 10GB on the same line
    Then the second package should be queued without starting consumption
    When I consume 3GB of data on the line
    Then the consumption should be deducted only from the first active 6GB package
    And the first package should show 3GB remaining
    When I completely exhaust the first package by consuming all 6GB
    Then the first B2B2C 6GB package should be marked as 100% depleted
    And the second queued package should automatically become active
    And the B2B2C 10GB package should be ready for consumption
    When I consume an additional 2GB on the line
    Then the consumption should be deducted from the second now active package
    And the second package should show 8GB remaining