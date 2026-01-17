Feature: Backend data synchronization verification for contract value and composition

  Scenario: Verify data synchronization between multiple backend services when querying contract value and composition
    Given the user is authenticated with advisor role in Acticenter module
    When the user selects a Casa de Bolsa Persona Fisica contract
    Then the system displays the contract value and composition component
    When the user clicks on the component to expand the breakdown
    Then the system displays the popup with all breakdown items
    And the MXN purchasing power values match the Advisor Module currentcash service
    And the Debt Funds coverage and variable income values match corresponding services
    And the total contract value equals the arithmetic sum of all displayed items