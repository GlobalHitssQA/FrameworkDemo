Feature: Verify Hedge Funds section text color complies with Look and Feel specifications

  Scenario: Validate text color of Hedge Funds section in contract breakdown
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a contract with hedge fund investments
    And the user clicks on the total contract value component
    Then the contract breakdown popup should be displayed
    And the Hedge Funds section text color should comply with Look and Feel specifications