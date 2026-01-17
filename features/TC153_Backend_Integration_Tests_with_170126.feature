Feature: Backend Integration Tests with SAP and Lumina Services

  Scenario: Validate integration tests communicate correctly with SAP and Lumina backend services
    Given the test environment has backend services available
    And test data is configured in SAP
    And service access credentials are configured
    When I execute integration tests with SAP services for contract data
    Then the tests execute successfully and retrieve contract data correctly
    When I verify integration tests validate purchasing power service for Casa de Bolsa contracts
    Then the tests confirm currentcash service returns correct data
    When I verify integration tests validate cash service for Bank contracts
    Then the tests confirm cuenta eje service returns correct balance
    When I verify integration tests validate Mexdolar accounts service for legal entities
    Then the tests confirm USD balance from Mexdolar accounts is obtained correctly
    When I verify integration tests validate error handling when backend services fail
    Then the tests confirm 500 errors and timeouts are handled correctly
    When I review integration tests validate service response times
    Then the tests confirm response times meet defined SLA requirements