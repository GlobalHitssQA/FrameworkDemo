Feature: USD Cash Display for Casa de Bolsa Contracts

  Scenario: Verify USD Cash amount is correctly displayed in US dollars for Casa de Bolsa contracts
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a Casa de Bolsa contract with USD balance
    And the user clicks on the total contract value component
    Then the breakdown popup is displayed
    And the USD Cash item shows the amount in US dollars without conversion to MXN