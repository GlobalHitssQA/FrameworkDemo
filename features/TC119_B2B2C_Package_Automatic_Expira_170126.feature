Feature: B2B2C Package Automatic Expiration on Full Consumption

  Scenario: Verify B2B2C package expires automatically when consuming 100% capacity before validity period ends
    Given a user with an active GM line on SOLD plan
    And B2B2C packages are configured in the system
    And consumption notifications at 80% and 100% are configured
    When the user activates a B2B2C 10GB package with 1 month validity on SOLD plan
    Then the B2B2C 10GB package is activated with 10GB available
    When the user consumes 8GB of the B2B2C 10GB package during the first 15 days
    Then the package registers 8GB consumption with 2GB remaining
    And a notification at 80% consumption is generated
    When the user consumes the remaining 2GB to exhaust the package completely
    Then the B2B2C 10GB package registers total consumption of 10GB
    And the system automatically marks the B2B2C 10GB package as exhausted and expired before the month validity ends
    And the system generates automatic notification informing complete consumption of B2B2C package
    When the user attempts to consume additional data with the exhausted B2B2C package
    Then the system does not allow consumption from the exhausted package
    And the system activates the next queued package or bulk rate