Feature: Verify In Pool summary in Traffic Detail section displays correctly calculated assigned pool

  Scenario: Validate assigned pool calculation in SOLD Rate Plan Traffic Detail
    Given I have active lines in SOLD RatePlan during the billing cycle
    And the In Pool calculation shell has been executed before pre-billing
    And the In Pool 10 MB package is configured
    And the billing cycle is closed
    When I identify the count of active lines in SOLD RatePlan during the billing cycle
    And I calculate the expected assigned pool as number of lines multiplied by 10 MB
    And I access the In Pool 10 MB summary in the Traffic Detail SOLD section of the invoice
    Then the Assigned Pool field should display the correctly calculated value
    And the calculation should include all lines that were in SOLD Rate Plan during the cycle regardless of consumption