Feature: AGAS21435 Service Integration for Individual Person Contracts

  Scenario: Verify correct integration and consumption of AGAS21435 service for Individual Person contract
    Given the user is authenticated in Acticenter with valid credentials
    When the user selects an Individual Person contract from Brokerage House or Bank
    Then the system should invoke the AGAS21435 service to retrieve contract data
    And the AGAS21435 service should respond with HTTP status code 200
    And the contract data should be displayed correctly in the Value and Composition component
    And the system logs should record the AGAS21435 request and response correctly