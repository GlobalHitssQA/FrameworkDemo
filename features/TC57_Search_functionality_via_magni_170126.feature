Feature: Search functionality via magnifying glass icon in Responsive view

  Scenario: Verify search functionality displays customer general screen and allows contract selection
    Given the user is authenticated and accesses Acticenter in Responsive resolution
    When the user clicks on the magnifying glass search icon
    Then the system displays the customer general screen with BP or contracts
    When the user selects a contract from the displayed list
    Then the system loads the selected contract and shows the total contract value component in Responsive view