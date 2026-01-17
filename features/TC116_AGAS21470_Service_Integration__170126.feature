Feature: AGAS21470 Service Integration for Legal Entity Contracts

  Scenario: Verify correct integration and consumption of AGAS21470 service for Legal Entity contract
    Given the user is authenticated in Acticenter with advisor credentials
    When the user selects a Legal Entity contract from Brokerage House or Bank
    Then the system should invoke AGAS21470 service automatically
    And the AGAS21470 service should return HTTP 200 with contract data
    And the contract data should be displayed correctly in the Value and Composition component
    And the system logs should confirm successful service invocation and response