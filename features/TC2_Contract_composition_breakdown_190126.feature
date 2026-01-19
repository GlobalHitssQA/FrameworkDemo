Feature: Contract composition breakdown for corporate clients

  Scenario: Verify complete breakdown of contract composition for Corporate Person in Brokerage House
    Given the user is authenticated in Acticenter
    And the user has selected a Corporate Person contract in Brokerage House
    When the system loads the contract
    Then the total contract value component should be displayed
    When the user clicks on the total contract value component
    Then a popup with detailed contract composition breakdown should be displayed
    And the popup should show the MXN Purchasing Power item with its corresponding amount
    And the popup should show the USD Cash item with its dollar amount
    And the popup should show all applicable items including Pending settlement and Debt funds and Coverage funds and Variable income funds and Cedes and promissory notes and Money market and Capital market
    And each item should display its monetary value on the right side showing zero for items without balance
    And the breakdown list should be vertically aligned with the total contract value component