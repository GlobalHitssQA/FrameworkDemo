Feature: Verify Poder de compra MXN value in Casa de Bolsa contract breakdown

  Scenario: Validate Poder de compra MXN matches currentcash value from Modulo Asesor
    Given the user is authenticated in Acticenter
    When the user selects a Casa de Bolsa contract
    Then the total contract value component is displayed
    When the user clicks on the total value component to expand breakdown
    Then the breakdown popup is displayed
    And the Poder de compra MXN field is visible with its monetary value
    When the user retrieves the currentcash value from Modulo Asesor
    Then the Poder de compra MXN value matches the currentcash value exactly