Feature: SAP Passive Services Integration Verification
  As a QA Engineer
  I want to verify the integration of SAP Passive services, valuation API, AGAS microservices, and Lumina
  So that the contract total value is correctly displayed for Individual clients in Private Banking

  Background:
    Given the test environment is configured with access to all required services
    And SAP Passive services are available
    And the contract valuation API is operational
    And microservices AGAS-21435 to AGAS-21806 are implemented
    And SAP pre-notes service is active
    And the interbank clearing house is functional
    And Advisor module with currentCash is available
    And Individual client contract in Private Banking with test data exists
    And integration with Lumina is established

  Scenario: Verify complete integration of SAP services and contract valuation
    Given I prepare the test environment with necessary configuration for SAP services and Lumina integration
    When I invoke the contract valuation API for an Individual client contract in Private Banking
    Then the API returns the expected total contract value information
    When I execute microservices AGAS-21435 to AGAS-21806
    Then all microservices respond correctly and integrate properly in the global response
    When I send requests to the SAP pre-notes service
    Then the SAP pre-notes service returns consistent data
    When I perform interbank clearing house tests
    Then the operations reconciliation is completed correctly
    When I validate the Advisor currentCash module with associated Mexdolar account
    Then the module correctly processes the associated Mexdolar account
    When I compare blocked cash with cash in transit
    Then the difference is correctly recorded in the system
    When I review the response structure of debt, coverage and equity funds services
    Then the structure complies with the expected format and contains valid data
    When I test the integration with Lumina verifying operations
    Then the operations are reflected timely and consistently in Lumina
    When I verify the contract total value component visualization in Acticenter
    Then the component displays the contract total value correctly for Individual client in Private Banking