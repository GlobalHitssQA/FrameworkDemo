Feature: Mexdolar Contract Buy-Sell Component Validation

  As an advisor user
  I want to validate that Mexdolar contracts in read-only mode disable the buy-sell component
  So that no operations can be performed through Lumina integration

  Background:
    Given the advisor user is authenticated in Acticenter
    And Acticenter microservices are operational
    And Lumina integration is working
    And Mexdolar contracts are configured as read-only

  Scenario: Validate buy-sell component is disabled for read-only Mexdolar contracts
    Given the advisor user accesses Acticenter platform
    When the user searches and selects a Moral Person Mexdolar contract from Advisor module
    Then the Mexdolar contract loads in Acticenter for consultation
    And the contract is displayed in read-only mode without operation capability
    When the user validates the USD Cash field
    Then the Mexdolar contract balance is displayed without exchange rate conversion
    And the service amount is presented as USD Cash in total valuation breakdown without MXN conversion
    When the user attempts to access the buy-sell component to perform an operation
    Then the buy-sell component is disabled and does not allow opening operation functionality
    And no buy or sell options are displayed when trying to interact with the component
    And the system keeps the buy-sell component disabled to avoid errors with Lumina
    When the user consults the total valuation breakdown information
    Then the valuation information is correctly displayed showing only USD Cash without operation items
    And the interbank clearing house does not execute processes for this contract
    And no operations or settlement processes are generated since the contract is read-only