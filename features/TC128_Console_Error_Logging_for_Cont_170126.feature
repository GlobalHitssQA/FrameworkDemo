Feature: Console Error Logging for Contract Value and Composition Component

  Scenario: Verify that errors related to value and composition component are logged correctly in browser console
    Given the user has browser developer tools enabled
    And the user is authenticated in Acticenter
    When the user opens the browser developer console
    And the user accesses a contract and clicks on the total value component
    Then the popup should display and informative logs should be captured if configured
    When the user simulates an error by loading a contract with incomplete data or unavailable services
    Then errors should be logged in the console with appropriate level and descriptive messages
    And the error messages should include relevant information like error type, affected component and stack trace
    When the user interacts with the component during normal operation
    Then no error messages should appear in the console during normal functioning