Feature: Backend service timeout configuration
  As a user of the OTA-ACTICENTER system
  I want backend service calls to have appropriate timeout configuration
  So that my user experience is not negatively affected by slow or unresponsive services

  Scenario: Verify backend service timeout configuration and error handling
    Given the performance monitoring system is active and recording response times
    And I am authenticated in the system with available contracts
    When I simulate a backend service with delayed response within acceptable timeout limits
    And I select a contract and request the value and composition component
    Then the system waits for the service response and displays the component when data is available
    When I simulate a backend service that exceeds the configured timeout
    Then the system cancels the request after timeout and displays an informative error message
    And the interface remains responsive and not blocked
    And the logs confirm timeout is configured at a reasonable value of 30 seconds