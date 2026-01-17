Feature: Verify Purchasing Power MXN field for Casa de Bolsa Individual Person contracts

  Scenario: Display Purchasing Power MXN in contract breakdown for Casa de Bolsa Individual Person
    Given the user is authenticated in Acticenter
    And the user has access to an active Casa de Bolsa Individual Person contract
    When the user selects a Casa de Bolsa Individual Person contract
    Then the system displays the operation screen with the selected contract
    When the user clicks on the total contract value component
    Then the system displays the breakdown popup with contract items
    And the Purchasing Power MXN field is visible in the breakdown list
    And the Purchasing Power MXN field displays its monetary value on the right side
    And the Purchasing Power MXN value matches the currentcash value from Advisor Module