Feature: TRIAL 6GB and B2B2C packages roaming restriction verification

  Scenario: Verify that TRIAL 6GB and B2B2C packages only allow local navigation and block Roaming service
    Given a test line with SOLD plan is available in the system
    When I activate a TRIAL 6GB package on the line
    Then the system registers the TRIAL 6GB package activation with local only coverage attribute without Roaming
    When I simulate a data consumption attempt in Roaming mode for the line with TRIAL 6GB package
    Then the PCRF system blocks data traffic in Roaming and only allows local navigation
    When I activate a B2B2C package on a line with SOLD plan
    Then the system registers the B2B2C package activation with local only coverage attribute without Roaming
    When I simulate a data consumption attempt in Roaming mode for the line with B2B2C package
    Then the PCRF system blocks data traffic in Roaming for B2B2C and only allows local navigation
    When I verify the package configuration table for TRIAL 6GB and B2B2C packages
    Then the system shows that TRIAL 6GB and B2B2C packages have Roaming parameter set to No