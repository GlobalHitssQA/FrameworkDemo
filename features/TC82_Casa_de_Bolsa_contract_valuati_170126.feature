Feature: Casa de Bolsa contract valuation service integration

  Scenario: Verify valuation service integration when querying a Casa de Bolsa contract
    Given the user is authenticated in Acticenter
    And there is an active Casa de Bolsa contract available
    And the contract valuation service is available
    When the user selects a Casa de Bolsa contract
    Then the system loads the selected contract
    When the user accesses the contract value and composition component
    Then the system invokes the valuation service for Casa de Bolsa
    And the component displays the total contract value
    And the component displays the detailed breakdown including Poder de compra MXN
    And the component displays Efectivo USD
    And the component displays other Casa de Bolsa specific items