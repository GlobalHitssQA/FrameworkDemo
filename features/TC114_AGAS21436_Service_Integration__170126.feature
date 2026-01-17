Feature: AGAS21436 Service Integration for Physical Person Contract Value

  Scenario: Verify correct integration and consumption of AGAS21436 service for Physical Person contract value
    Given the user is authenticated in Acticenter
    When the user selects a Physical Person contract
    Then the system loads the contract and displays the operation screen
    And the system automatically invokes the AGAS21436 service with contract parameters
    And the AGAS21436 service responds with HTTP status code 200
    And the service returns the total contract value
    And the total value displayed in the component matches the service response
    And the service response time is within acceptable performance limits