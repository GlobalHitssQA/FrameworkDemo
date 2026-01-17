Feature: Verify Cash MXN balance in contract value breakdown for Bank contract

  Scenario: Verify Cash MXN balance is displayed correctly in contract value breakdown
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a Bank type contract
    Then the system loads the contract information and displays the total value component
    When the user clicks on the total contract value component
    Then a popup is displayed with the contract value breakdown
    And the Cash MXN item is visible in the breakdown
    And the Cash MXN amount matches the bank contract account balance