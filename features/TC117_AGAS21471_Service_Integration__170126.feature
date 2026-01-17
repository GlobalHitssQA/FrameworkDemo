Feature: AGAS21471 Service Integration for Persona Moral Contract Value

  Scenario: Verify correct integration and consumption of AGAS21471 service for Persona Moral contract value
    Given the user is authenticated in Acticenter
    And the user navigates to the funds operation section
    When the user selects a Persona Moral contract
    Then the system should invoke AGAS21471 service automatically
    And the service should respond with HTTP 200 status code
    And the contract total value should be displayed in the component
    And the displayed value should match the service response exactly
    And the service response time should meet performance standards
    When the user selects a Persona Moral Mexdolar contract
    Then the service should return USD cash balance correctly
    And the USD balance should be displayed without conversion to pesos