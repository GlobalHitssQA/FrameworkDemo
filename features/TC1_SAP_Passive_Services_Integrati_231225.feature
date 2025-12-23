Feature: SAP Passive Services Integration with Valuation API and Lumina

  Scenario: Verify end-to-end integration of SAP services, AGAS microservices, and Lumina for individual client contract
    Given the test environment is configured with SAP services and Lumina integration
    And the contract valuation API is operational
    And microservices AGAS-21435 to AGAS-21806 are deployed
    And SAP prenotes service is active
    And interbank clearing chamber is functional
    And Advisor module with currentCash is available
    And a Natural Person contract exists in Private Banking with test data
    When I invoke the contract valuation API for the Natural Person contract
    Then the API returns the expected total contract value
    When I execute microservices AGAS-21435 to AGAS-21806
    Then all microservices respond correctly and integrate properly
    When I send requests to SAP prenotes service
    Then the service returns consistent data
    When I perform interbank clearing chamber tests
    Then operations reconciliation is completed successfully
    When I validate the Advisor currentCash module with associated Mexdolar account
    Then the module processes the Mexdolar account correctly
    When I compare blocked cash with cash in transit
    Then the difference is recorded correctly in the system
    When I review the response structure of debt, coverage and equity funds services
    Then the structure meets the expected format and contains valid data
    When I test Lumina integration verifying operations
    Then operations are reflected timely and coherently in Lumina
    When I verify the total contract value component display in Acticenter
    Then the component shows the correct total contract value for Natural Person in Private Banking