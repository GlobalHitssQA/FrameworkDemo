Feature: Memory Leak Validation for Contract Breakdown Component

  Scenario: Verify no memory leaks occur when repeatedly opening and closing the breakdown component
    Given the user is authenticated in Acticenter with an active contract selected
    And the browser developer tools are open with memory monitor active
    When I record the baseline memory consumption with the component closed
    And I perform 50 consecutive open and close operations on the breakdown component
    And I manually trigger garbage collection in the browser
    Then the final memory consumption should not exceed 10 percent of the baseline