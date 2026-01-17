Feature: Invoice Summary Services In Pool Visualization

  Scenario: Verify Services In Pool item is displayed in invoice summary for SOLD plan lines with consumption within assigned pool
    Given the user is authenticated in the BSCS7 billing system
    And there are active lines in SOLD plan with telemetry consumption within the In Pool allocation
    When the user accesses the billing system for General Motors client
    And the user executes the monthly billing process with cutoff on day 28
    And the user navigates to the Receipt Summary section in the generated invoice
    Then the Services In Pool item should be displayed
    And the calculated amount should reflect the number of active lines at S/. 1.30 per 10MB package