Feature: Billing calculation when telemetry traffic equals In Pool allocation

  Scenario: Verify correct billing when total telemetry consumption equals assigned In Pool allocation
    Given I have active SOLD plan lines with In Pool package during the billing cycle
    And the In Pool calculation Shell is configured
    And the Document All table is available
    When I identify the number of active SOLD lines and calculate the total In Pool allocation
    Then I should see the exact count of active SOLD lines
    And the In Pool allocation should be calculated as lines multiplied by 10 MB
    When I configure the test scenario with telemetry consumption equal to the calculated allocation
    Then the total telemetry traffic from APN1 and APN4 should equal the assigned allocation exactly
    When I execute the In Pool calculation Shell to summarize traffic
    Then the Shell should calculate total consumption correctly
    And it should determine consumption equals allocation with no excess
    When I verify the generated OCC records
    Then an OCC with concept In Pool Service should be generated
    And the OCC amount should equal number of lines multiplied by 1.30 soles
    And no OCC with concept In Pool Granel Service should exist in Document All table