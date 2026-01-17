Feature: Pop-up breakdown behavior when user changes contract

  Scenario: Verify popup closes automatically when selecting a different contract
    Given the user is authenticated in Acticenter with a valid contract selected
    When the user clicks on the Contract Value and Composition component
    Then the system displays the breakdown popup with contract details
    And the popup shows Buying Power, Cash, and Funds sections
    When the user selects a different contract using the search function without closing the popup
    Then the system automatically closes the previous breakdown popup
    And the Contract Value and Composition component displays the new contract data
    And the breakdown popup is not displayed