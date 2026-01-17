Feature: Contract type specific sections display

  Scenario: Verify that the system displays only applicable sections according to selected contract type
    Given the user is authenticated in the system
    And different contract types are available for consultation
    When the user selects a Casa de Bolsa contract and clicks on total value
    Then the breakdown displays Poder de compra MXN and Efectivo USD
    And the breakdown does not display Efectivo MXN
    When the user selects a Banco Persona Fisica contract without Mexdolar account
    Then the breakdown displays Efectivo MXN
    And the breakdown does not display Efectivo USD
    When the user selects a Banco Persona Moral contract with Mexdolar account
    Then the breakdown displays both Efectivo MXN and Efectivo USD with their values
    When the user verifies Efectivo en transito section for Banco contracts
    Then Efectivo en transito appears only for Banco contracts
    And Efectivo en transito does not appear for Casa de Bolsa contracts
    When the user verifies Poder de compra MXN section visibility
    Then Poder de compra MXN appears only for Casa de Bolsa contracts
    And Poder de compra MXN does not appear for Banco contracts