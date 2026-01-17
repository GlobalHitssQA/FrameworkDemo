Feature: Verify Acticenter values match Modulo Asesor values

  Scenario: Compare contract values between Acticenter and Modulo Asesor
    Given the user is authenticated in Acticenter
    And the user is authenticated in Modulo Asesor
    When the user selects a specific contract in Acticenter
    Then the system displays the contract information in Acticenter
    When the user expands the contract value breakdown in Acticenter
    Then the system displays all items with their corresponding values
    And the user records the values including Poder de compra and Efectivo
    When the user accesses Modulo Asesor with the same contract
    Then the system displays the contract information in Modulo Asesor
    And the Poder de compra value matches the currentcash field in Modulo Asesor
    And all other item values are consistent between both systems