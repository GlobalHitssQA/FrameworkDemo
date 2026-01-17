Feature: Wealth Management contract value and composition component functionality on Desktop

  Scenario: Verify the display and functionality of value and composition component in Desktop view for Wealth Management
    Given the user is authenticated in Acticenter from a Desktop device with Wealth Management credentials
    When the user selects a Wealth Management contract from the operation module
    Then the system loads the contract with the total value component visible on screen
    When the user clicks on the value and composition component to expand the breakdown
    Then the system displays a popup showing the breakdown of applicable Wealth Management items
    And all applicable items are displayed with their values including Buying power MXN for Brokerage House and Cash MXN for Bank and Cash USD if applicable and Pending settlement and Debt funds and Hedge funds and Equity funds and Cash in transit for Bank and CDs and promissory notes and Money market and Capital market
    And the breakdown shows all items with correct monetary format and values aligned to the right and zero values displayed as zero pesos
    When the user clicks on the magnifying glass in the header to search for another contract
    Then the system presents the general client or BP search screen allowing selection of another contract