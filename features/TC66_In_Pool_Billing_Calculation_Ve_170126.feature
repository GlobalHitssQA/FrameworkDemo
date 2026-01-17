Feature: In Pool Billing Calculation Verification
  As a billing system administrator
  I want to verify the correct billing calculation when telemetry traffic consumption is less than the assigned In Pool bag
  So that customers are charged correctly without excess fees

  Scenario: Verify billing calculation when total telemetry consumption is less than In Pool bag
    Given I have active SOLD plan lines with In Pool 10MB package configured
    And I identify the total number of active lines and calculate the total In Pool bag
    When I configure a test scenario with telemetry consumption at 70 percent of the total bag
    And I execute the In Pool calculation Shell to process the traffic
    Then the Shell should determine consumption does not exceed the assigned bag
    And the OCC In Pool Service should be generated for the full amount based on number of lines
    And no OCC In Pool Granel Service should be generated in Document All table