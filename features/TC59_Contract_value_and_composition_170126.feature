Feature: Contract value and composition visualization after search

  Scenario: User selects a contract from search results and views its value and composition information
    Given the user is authenticated in Acticenter
    And the search screen is accessible via the magnifying glass icon
    When the user clicks on the magnifying glass icon in the Acticenter header
    Then the system displays the general client screen with the list of BP or available contracts
    When the user selects a specific contract from the displayed list
    Then the system loads the selected contract in the operation screen
    And the total contract value component is displayed with the selected contract information
    When the user clicks on the total contract value component
    Then the system displays the breakdown with all items and monetary values corresponding to the selected contract