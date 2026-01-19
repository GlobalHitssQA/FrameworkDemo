Feature: Contract Value and Composition Component for Casa de Bolsa

  Scenario: Verify value and composition component displays correctly for Casa de Bolsa contracts
    Given the user is authenticated in Acticenter with fund operation permissions
    When the user selects a Casa de Bolsa contract from the fund operation flow
    Then the component should display the total contract value with monetary format
    When the user clicks on the value and composition component
    Then a popup should display the detailed contract value breakdown
    And the popup should show the "Poder de compra MXN" item with its monetary value on the right side
    And the popup should show the "Efectivo USD" item with its dollar amount