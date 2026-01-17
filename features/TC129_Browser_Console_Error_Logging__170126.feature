Feature: Browser Console Error Logging Verification
  As a system administrator
  I want to verify that the system correctly logs errors in the browser console
  So that I can diagnose and troubleshoot component failures

  Scenario: Verify error logging when network failure occurs during contract selection
    Given the browser is opened with developer tools and console enabled
    And I navigate to the Acticenter module
    When I login with valid credentials
    Then the system loads correctly without console errors
    When I simulate a network failure by going offline
    And I attempt to select a contract to load the value and composition component
    Then the console logs a descriptive error message indicating connection failure
    And the error log contains timestamp and error type and affected service
    When I restore the network connection by going online
    Then the system recovers successfully and logs the recovery in console
    And there are no unhandled JavaScript errors in the console