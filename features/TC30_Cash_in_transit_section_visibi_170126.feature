Feature: Cash in transit section visibility for Bank contracts

  Scenario: Verify that Cash in transit section is displayed only for Bank contracts using SAP prenotes service
    Given the user is authenticated in Acticenter
    And the user selects a Bank type contract
    Then the system displays the selected contract with the total value component
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract value breakdown
    And the Cash in transit section is visible in the breakdown list
    And the Cash in transit value matches the SAP prenotes service data
    When the user selects a Brokerage House type contract
    And the user clicks on the total contract value component
    Then the Cash in transit section is not visible in the breakdown list