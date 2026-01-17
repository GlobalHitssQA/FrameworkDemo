Feature: Search functionality via magnifying glass icon in Desktop view

  Scenario: User searches for a client and selects a contract using the magnifying glass icon
    Given the user is authenticated and on the Acticenter Desktop view
    When the user clicks on the magnifying glass search icon in the header
    Then the system displays the client general screen with available BP or contracts
    When the user selects a specific contract from the list
    Then the system loads the selected contract and displays the total contract value component