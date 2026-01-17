Feature: Verify Buying Power MXN value consistency between Acticenter and Advisor Module

  Scenario: Compare Buying Power MXN value in Acticenter with currentcash value in Advisor Module for Brokerage House contracts
    Given I have identified a valid Brokerage House contract with buying power balance
    And I am logged into the Advisor Module
    When I query the currentcash value for the identified contract
    Then the Advisor Module displays the currentcash value in Mexican pesos
    And I record the exact currentcash value including decimals
    When I authenticate in Acticenter
    And I select the same Brokerage House contract
    Then the system loads the contract and displays the Value and Composition component
    When I expand the contract breakdown
    Then the popup displays the breakdown including the Buying Power MXN field with its value in pesos
    And the Buying Power MXN value in Acticenter matches exactly the currentcash from Advisor Module
    When I select a Bank contract
    Then the Buying Power MXN field is not displayed in the breakdown
    And only the Cash MXN field is shown for Bank contracts