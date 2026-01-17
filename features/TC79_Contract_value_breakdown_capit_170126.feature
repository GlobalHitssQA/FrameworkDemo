Feature: Contract value breakdown capital market section verification

  Scenario: Verify the Capital Market section name in contract value breakdown matches Look and Feel specifications
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a contract with capital market investments
    And the user clicks on the total contract value component
    Then the breakdown popup is displayed
    And the Capital Market section is displayed with the name "Mercado de capitales"