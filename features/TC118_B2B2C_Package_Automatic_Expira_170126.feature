Feature: B2B2C Package Automatic Expiration by Validity Period

  Scenario: Verify B2B2C packages expire automatically when configured validity period is reached
    Given a user with an active GM line on SOLD plan
    And the B2B2C packages are configured with validity periods of 1, 12, 24 and 36 months
    And the validity control system is operational
    When I activate a B2B2C 6GB package with 1 month validity of 30 days
    Then the B2B2C 6GB package is activated with 30 days validity
    When I simulate the passage of 30 complete days without exhausting the package capacity
    Then the system automatically marks the B2B2C 6GB package as expired by time on day 30
    When I activate a B2B2C 12GB package with 12 months validity of 360 days
    Then the B2B2C 12GB package is activated with 360 days validity
    When I simulate the passage of 360 complete days with partial consumption of 8GB
    Then the system marks the B2B2C 12GB package as expired by time on day 360 with 4GB unconsumed
    When I activate a B2B2C 24GB package with 24 months validity of 720 days
    Then the B2B2C 24GB package is activated with 720 days validity
    When I simulate the passage of 720 complete days
    Then the system marks the B2B2C 24GB package as expired by time on day 720