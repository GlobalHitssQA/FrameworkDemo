Feature: Roaming restriction validation for TRIAL 6GB and B2B2C packages

  Scenario: Verify roaming is blocked for TRIAL 6GB and B2B2C packages on SOLD plan
    Given a user has an active GM line with SOLD plan
    And the provisioning system is operational
    When the user activates a TRIAL 6GB package on the test line
    Then the TRIAL 6GB package should be activated successfully
    When the user simulates data consumption in international roaming mode with TRIAL 6GB package
    Then the system should block roaming data consumption and prevent navigation
    When the user activates a B2B2C package on the test line
    Then the B2B2C package should be activated successfully
    When the user simulates data consumption in international roaming mode with B2B2C package
    Then the system should block roaming data consumption and prevent navigation
    And both TRIAL 6GB and B2B2C packages should only allow local consumption without roaming access