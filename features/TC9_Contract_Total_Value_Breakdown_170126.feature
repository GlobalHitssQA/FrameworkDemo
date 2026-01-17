Feature: Contract Total Value Breakdown - Purchasing Power MXN Display

  Scenario: Verify that the total value breakdown displays the Purchasing Power MXN item with correct value for Casa de Bolsa Physical Person contracts
    Given the user is authenticated in Acticenter
    And a Casa de Bolsa contract for Physical Person is selected
    When the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the Purchasing Power MXN item should be visible in the breakdown list
    And the Purchasing Power MXN value should be aligned to the right in Mexican pesos format
    And the displayed amount should match the currentcash value from Casa de Bolsa contract
    And when the contract has no balance in this item it should display zero pesos