Feature: Contract Breakdown Popup Items Order Verification

  Scenario: Verify that breakdown popup items are displayed in the specified order
    Given the user is authenticated in Acticenter
    And the user selects an active contract
    Then the system displays the contract screen
    When the user clicks on the total contract value component
    Then the system displays the breakdown popup with all items
    And the first item is Purchasing Power MXN or Cash MXN depending on contract type
    And the following items appear in order: Cash USD, Pending settlement, Debt funds, Hedge funds, Equity funds
    And the final items are Cedes and promissory notes, Money market, and Capital market
    And all items display their monetary value aligned to the right