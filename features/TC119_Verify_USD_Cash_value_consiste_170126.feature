Feature: Verify USD Cash value consistency between Acticenter and Asset systems

  Scenario: USD Cash value in Acticenter matches Asset system for Casa de Bolsa contracts
    Given I have identified a Casa de Bolsa contract with USD balance
    And I have accessed the Asset system
    When I query the USD Cash value for the identified contract in Asset
    Then I should see the USD amount displayed in Asset
    And I record the exact USD Cash value with full decimals
    When I authenticate in Acticenter
    And I select the same Casa de Bolsa contract
    Then the system loads the contract and displays the Value and Composition component
    When I expand the contract breakdown
    Then I should see the USD Cash item in the popup breakdown
    And the USD Cash value in Acticenter matches exactly the value recorded from Asset