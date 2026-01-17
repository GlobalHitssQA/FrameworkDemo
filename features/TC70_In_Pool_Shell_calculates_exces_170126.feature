Feature: In Pool Shell calculates excess MB and applies correct bulk rate

  Scenario: Shell correctly calculates excess MB when consumption exceeds In Pool bag and applies correct bulk rate
    Given a scenario is configured with total consumption exceeding the In Pool bag
    And the In Pool bag is set to 500 MB with total consumption of 650 MB
    When I manually calculate the excess MB by subtracting the assigned bag from total consumption
    Then the manual calculation shows 150 MB of excess
    When I execute the In Pool calculation Shell to process traffic
    Then the Shell calculates the excess and logs the value equal to the manual calculation
    When I manually calculate the amount to bill by multiplying excess MB by bulk rate 0.0372
    Then the expected amount for OCC In Pool Bulk Service is 5.58 soles
    When I verify the OCC In Pool Bulk Service generated in Document All
    Then the OCC amount corresponds exactly to excess MB multiplied by 0.0372