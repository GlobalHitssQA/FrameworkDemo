Feature: Contract Value Breakdown Display for Casa de Bolsa Individual Accounts

  Scenario: Validating contract value breakdown display for Casa de Bolsa individual accounts
    Given the user has advisor credentials and is on the Acticenter login page
    When the user logs in with valid advisor credentials
    Then the user successfully logs in to the Acticenter platform
    When the user searches for a Casa de Bolsa individual account contract
    And the user selects the Persona Fisica contract from search results
    Then the contract is selected and main view displays contract information
    When the user locates the contract value component in the operations flow
    Then the contract value component is visible with total contract value displayed
    When the user clicks on the contract value component
    Then the breakdown popup displays with the following items:
      | item                      |
      | Poder de compra MXN       |
      | Efectivo USD              |
      | Pendientes por liquidar   |
      | Fondos de deuda           |
      | Fondos de cobertura       |
      | Fondos de renta variable  |
      | Cedes y pagares           |
      | Mercado de dinero         |
      | Mercado de capitales      |
    And the Poder de compra MXN displays the currentcash value from Modulo asesor
    And all breakdown items display monetary values aligned to the right
    And items with no value show zero amount
    When the user clicks outside the breakdown component area
    Then the popup closes and returns to main contract view