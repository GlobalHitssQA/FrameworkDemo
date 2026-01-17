Feature: Backend Service Recovery After Temporary Failure
  As a user of the OTA-ACTICENTER system
  I want the system to automatically recover when backend services become available
  So that I can continue viewing contract information without restarting the application

  Scenario: System automatically recovers connection after backend service failure
    Given the backend contract services are temporarily unavailable
    And a user is authenticated in the system
    When the user attempts to select a contract while services are down
    Then the system should display a service unavailability error message
    When the backend services are restored to operational status
    And the user refreshes the contract component without restarting the session
    Then the system should automatically recover the connection
    And the contract value component should display information correctly
    And no application or session restart should be required