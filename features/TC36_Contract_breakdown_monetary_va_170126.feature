Feature: Contract breakdown monetary values horizontal alignment

  Scenario: Verify monetary values are right-aligned in the contract breakdown popup
    Given the user is authenticated in Acticenter system
    And the user has selected a contract with values in multiple categories
    When the user clicks on the value and composition component
    Then the breakdown popup is displayed with the list of categories
    And all monetary values are right-aligned in each category
    And the right alignment is consistent for Poder de compra category
    And the right alignment is consistent for Efectivo MXN category
    And the right alignment is consistent for Efectivo USD category
    And the right alignment is consistent for Pendientes por liquidar category
    And the right alignment is consistent for Fondos category
    And the right alignment is consistent for Cedes y pagares category
    And the right alignment is consistent for Mercado de dinero category
    And the right alignment is consistent for Mercado de capitales category