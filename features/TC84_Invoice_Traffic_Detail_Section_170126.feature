Feature: Invoice Traffic Detail Section Summary Verification

  Scenario: Verify that Traffic Detail SOLD section includes consolidated In Pool 10 MB summary
    Given the user has access to the billing system
    And there are active lines in SOLD RatePlan with In Pool 10 MB package configured
    And the In Pool calculation shell has been executed
    And the billing cycle is closed
    When the user generates a consolidated invoice for General Motors for the current cycle
    Then the system processes the billing including In Pool calculation
    When the user navigates to the Traffic Detail SOLD section in the generated invoice
    Then the traffic detail section with telemetry data is displayed
    When the user scrolls to the end of the Traffic Detail SOLD section
    Then a summary area is visible at the end of the section
    And the summary displays the In Pool 10 MB consolidated concept
    And the summary includes the assigned bag calculated as number of lines multiplied by 10 MB
    And the summary includes the consumption within the bag
    And the summary includes the bulk excess when consumption exceeds the bag