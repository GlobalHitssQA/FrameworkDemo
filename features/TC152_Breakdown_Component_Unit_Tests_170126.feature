Feature: Breakdown Component Unit Tests Validation

  Scenario: Verify unit tests validate all breakdown sections and their presentation
    Given the development environment is properly configured
    And the unit testing framework is installed
    And the breakdown component is implemented
    When I execute the unit tests for the breakdown value component
    Then the unit tests should run without errors
    And the tests should validate correct presentation of all sections including Poder de compra and Efectivo and Fondos and Cedes and Mercado de dinero and Mercado de capitales
    And the tests should validate the breakdown popup opens and closes correctly on click
    And the tests should validate the vertical alignment of the breakdown with the main component
    And the code coverage should be above 80 percent according to project standards