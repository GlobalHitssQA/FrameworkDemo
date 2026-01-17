Feature: Verify Poder de compra MXN matches currentcash from Modulo Asesor

  Scenario: Verify that Poder de compra MXN value for Casa de Bolsa contracts matches exactly the currentcash from Modulo Asesor
    Given the user is authenticated in Modulo Asesor
    And the user has access to a specific Casa de Bolsa contract
    When the user retrieves the currentcash value from Modulo Asesor
    And the user navigates to Acticenter
    And the user selects the same Casa de Bolsa contract
    And the user expands the total value breakdown popup
    Then the Poder de compra MXN value should match exactly the currentcash value from Modulo Asesor
    And when the currentcash value changes in Modulo Asesor the Poder de compra MXN should reflect the updated value