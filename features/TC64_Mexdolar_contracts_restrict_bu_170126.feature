Feature: Mexdolar contracts restrict buy/sell operations in Acticenter

  Scenario: Verify Mexdolar contracts do not allow buy/sell operations
    Given the user is authenticated in Acticenter
    When the user selects a Mexdolar Persona Moral contract
    Then the contract is displayed in read-only mode
    And the operations icon is disabled
    And the buy/sell module is not accessible
    And only contract values can be consulted without operation options