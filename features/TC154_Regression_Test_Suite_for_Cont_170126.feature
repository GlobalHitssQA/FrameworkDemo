Feature: Regression Test Suite for Contract Value and Composition Component

  Scenario: Execute full regression suite to verify existing functionalities are not affected by new changes
    Given the regression test suite is properly configured and ready to execute
    When I execute the complete regression test suite for value and composition component
    Then all regression tests should execute successfully
    And the tests should verify Casa de Bolsa contracts for Persona Fisica and Moral without regressions
    And the tests should verify Banco contracts for Persona Fisica and Moral without regressions
    And the tests should verify all breakdown categories including Fondos de deuda, cobertura, renta variable, Cedes, Mercado dinero and capitales
    And the tests should verify all supported views Desktop PA, PR, WM and Responsive without regressions
    And a regression report should be generated documenting all identified regressions