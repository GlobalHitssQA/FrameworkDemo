Feature: Backend service retry logic verification
  As a system administrator
  I want the system to implement retry logic when backend service calls fail
  So that temporary failures do not affect the user experience

  Scenario: System automatically retries failed backend service calls
    Given the backend call monitoring system is configured and active
    And the contract value service is configured to fail on first call but succeed on retry
    When I select a contract and request the component visualization
    Then the system should attempt the first call which fails
    And the system should automatically execute retry attempts
    And the logs should show multiple call attempts to the service
    And the contract component should display correctly after successful retry