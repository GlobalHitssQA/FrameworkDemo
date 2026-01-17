Feature: Verify Efectivo MXN value matches account balance

  Scenario: Validate Efectivo MXN displays correct account balance from Banco contract
    Given the user is authenticated in Acticenter
    When the user selects a Banco contract for Persona Fisica or Persona Moral
    Then the system displays the total contract value component
    When the user clicks on the total value component to expand the breakdown
    Then the system displays a popup with the contract value breakdown
    And the user locates the Efectivo MXN item in the breakdown
    Then the Efectivo MXN value should match the account balance from the source system