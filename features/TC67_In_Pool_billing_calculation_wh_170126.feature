Feature: In Pool billing calculation when consumption exceeds allocated pool

  Scenario: Verify correct billing calculation when total consumption exceeds In Pool by 5 MB
    Given the SOLD lines with active In Pool plan are configured in the system
    And the In Pool calculation Shell is properly configured
    And the parametric table has correct rates configured
    When I calculate the total In Pool pool for active SOLD lines
    And I configure consumption to exceed the pool by exactly 5 MB
    And I generate telemetry traffic through APN1 and APN4 totaling the pool plus 5 MB excess
    And I execute the In Pool calculation Shell to summarize traffic
    Then the Shell should correctly detect a 5 MB excess over the assigned pool
    And the OCC In Pool Service should be generated for the total 10MB packages
    And the OCC In Pool Service amount should equal number of lines multiplied by 1.30 soles
    And the OCC In Pool Granel Service should be generated only for the 5 MB excess
    And the OCC In Pool Granel Service amount should equal 0.186 soles