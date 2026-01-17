Feature: Contract component reset and update on client or contract change

  Scenario: Verify that the component resets and updates correctly when selecting a different client or contract
    Given the user is authenticated in Acticenter with an initial contract selected
    When the user clicks on the component to display the breakdown of the first contract
    Then the breakdown opens showing the items and values of the first selected contract
    When the user clicks on the search magnifying glass to find a different client or contract
    And the user selects a different contract from the search results
    Then the component resets and displays the values corresponding to the new selected contract
    And the breakdown is automatically closed when changing contracts
    When the user expands the breakdown of the new contract
    Then the breakdown displays the specific items and values of the new contract without mixing information from the previous contract