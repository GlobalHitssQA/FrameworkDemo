Feature: Verify Hedge Funds item display in contract value breakdown

  Scenario: User verifies Hedge Funds item with its monetary accumulated value in contract breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract with hedge fund investments
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract value breakdown
    When the user locates the Hedge Funds item in the breakdown list
    Then the Hedge Funds item is visible in the list
    And the accumulated monetary value for hedge fund investments is displayed on the right side