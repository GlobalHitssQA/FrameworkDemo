Feature: Value and Composition Component Functionality on Microsoft Edge

  Scenario: Verify value and composition component works correctly with all features for Casa de Bolsa Persona Moral
    Given the user opens Microsoft Edge browser
    And the user navigates to Acticenter module
    And the user logs in with valid credentials
    When the user selects a Casa de Bolsa Persona Moral contract
    Then the value and composition component renders correctly
    When the user clicks on the component to open the breakdown popup
    Then the popup displays all applicable items
    And the Poder de compra MXN value is displayed correctly
    And the Efectivo USD value is displayed correctly
    When the user hovers over interactive elements
    Then the tooltips are displayed correctly
    When the user clicks outside the component
    Then the popup closes correctly
    And no console errors or warnings are present