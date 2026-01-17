Feature: Cash USD breakdown display for Casa de Bolsa Persona Moral contracts

  Scenario: Verify Cash USD item appears correctly in breakdown for Casa de Bolsa Persona Moral contracts
    Given I am authenticated in Acticenter
    When I select a Casa de Bolsa Persona Moral contract from the contract selector
    Then the system displays the total contract value component
    When I click on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the Cash USD item appears in the breakdown list
    And the Cash USD value is displayed with USD currency format