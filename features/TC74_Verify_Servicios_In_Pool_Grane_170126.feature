Feature: Verify Servicios In Pool Granel calculation with excess rate

  Scenario: Validate that Servicios In Pool Granel amount is calculated correctly using excess rate S/. 0.0372 per MB
    Given the user is authenticated in BSCS7 system
    And there are active SOLD plan lines with telemetry consumption exceeding the assigned pool
    And the parametric table is configured with excess rate of 0.0372 per MB
    When the In Pool calculation shell is executed to summarize total telemetry traffic for APN1 and APN4
    Then the system should correctly totalize consumption in MB for all SOLD plan lines
    When the excess is calculated as total consumption minus assigned pool
    Then the system should determine that excess exists when total consumption exceeds the assigned pool
    When the excess rate is applied multiplying excess MB by 0.0372 without IGV
    Then the system should generate the OCC Servicios In Pool Granel with the calculated excess amount
    When the user queries the Servicios In Pool Granel item amount in the invoice summary
    Then the system should display the excess amount calculated correctly
    And the invoice amount should match the expected calculation using formula total MB minus assigned pool MB times 0.0372