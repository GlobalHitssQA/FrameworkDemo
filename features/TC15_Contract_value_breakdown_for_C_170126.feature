Feature: Contract value breakdown for Casa de Bolsa Persona Fisica

  Scenario: Verify USD Cash item appears correctly in breakdown for Casa de Bolsa Persona Fisica contracts
    Given the user is authenticated in Acticenter
    When the user selects a Casa de Bolsa Persona Fisica contract from the contract selector
    Then the system displays the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the USD Cash item is visible in the breakdown list
    And the USD Cash value is displayed with USD currency format