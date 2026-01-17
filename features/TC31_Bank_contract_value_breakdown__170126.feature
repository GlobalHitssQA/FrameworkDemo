Feature: Bank contract value breakdown display
  As an advisor user
  I want to see the contract value breakdown when selecting a Bank type contract
  So that I can verify the correct components are displayed including Cash in transit

  Scenario: Verify contract value breakdown shows Cash in transit for Bank contract and hides it for Casa de Bolsa
    Given the advisor user is authenticated in Acticenter system
    When the user selects a Bank type contract from the query screen
    Then the system displays the contract information with the total value component
    When the user clicks on the value and composition component to expand the breakdown
    Then the system displays the popup with breakdown showing Cash in transit item
    When the user closes the breakdown and selects a Casa de Bolsa type contract
    Then the system displays the Casa de Bolsa contract information
    When the user clicks on the value and composition component to expand the breakdown
    Then the system displays the popup with breakdown without showing Cash in transit item