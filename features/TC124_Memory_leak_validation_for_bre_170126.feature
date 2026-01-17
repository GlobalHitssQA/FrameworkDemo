Feature: Memory leak validation for breakdown popup

  Scenario: Verify that repeated opening and closing of breakdown popup does not cause memory leaks
    Given the browser is launched with developer tools and memory monitoring enabled
    And the user is authenticated in the Acticenter system
    When the user accesses the Acticenter module and selects an active contract
    Then the value and composition component should be displayed correctly
    When the user records the initial browser memory consumption
    Then the base memory value in MB should be captured
    When the user opens and closes the breakdown popup 50 consecutive times
    Then the popup should open and close correctly on each iteration
    When the user forces garbage collection in the browser
    Then the browser should execute memory cleanup
    When the user records the final memory consumption and compares with initial value
    Then the memory increase should be less than 10 percent of the initial value