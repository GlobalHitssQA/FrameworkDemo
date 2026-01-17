Feature: Contract value and composition component validation in Acticenter module

  Scenario: Verify all acceptance criteria for contract value and composition component
    Given the user is authenticated as an advisor in the Acticenter module
    When the user searches and selects an existing contract
    Then the contract value and composition component is displayed
    And the component shows the total contract value with correct monetary format
    When the user clicks on the contract value component
    Then a popup with the value breakdown is displayed aligned vertically
    And the breakdown includes all applicable items based on contract type
    And items without monetary value are displayed as zero
    When the user verifies Casa de Bolsa contract items
    Then the purchasing power MXN item is displayed with currentcash value
    And the USD cash item shows the dollar currency amount
    When the user verifies Bank contract items
    Then the MXN cash item is displayed with account balance
    And the cash in transit item is displayed with SAP prenotes information
    When the user verifies Bank Persona Moral contract with Mexdolar account
    Then the USD cash item is displayed without exchange rate conversion
    And the breakdown shows pending settlements accumulated value
    And the breakdown shows debt funds hedge funds and equity funds accumulated values
    And the breakdown shows Cedes pagares money market and capital market values
    When the user clicks outside the breakdown component
    Then the breakdown popup closes
    And the search function with magnifying glass icon is visible
    When the user clicks on the magnifying glass search icon
    Then the client general screen is displayed for contract selection
    When the user views a Mexdolar Persona Moral contract
    Then the USD cash is displayed as read only without exchange conversion
    And the buy sell widget is disabled
    When the user validates responsive views
    Then the component works correctly in desktop landscape and portrait views