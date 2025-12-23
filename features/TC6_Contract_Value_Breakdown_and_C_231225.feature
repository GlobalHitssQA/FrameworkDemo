Feature: Contract Value Breakdown and Client-Contract Search Validation

  Background:
    Given the user is authenticated in Acticenter
    And contracts with zero value items are available for testing
    And contracts of different types are available (Physical Person, Moral Person, Bank, Brokerage House)

  Scenario: Verify zero value items display $0.00 correctly and search functionality across desktop and responsive views
    Given the user selects a contract with some items without monetary value
    When the contract total value component is displayed
    And the user opens the contract value breakdown
    Then the popup with complete breakdown is displayed
    And all applicable items without balance show $0.00 correctly
    And the currency format shows $0.00 with two decimal places
    
    When the user closes the popup
    And clicks on the search magnifying glass in desktop version
    Then the general client or BP screen is presented as currently shown in Acticenter
    
    When the user selects a contract from the search
    Then the contract is selected and displayed correctly
    
    When the user switches to responsive view
    And presses the search magnifying glass
    Then the general client screen is presented as currently shown in Acticenter module
    
    When the user selects another contract from the search in responsive view
    Then the advisor can select the contract to view or operate
    
    When the user searches for Physical Person and Moral Person contracts
    Then the search returns results for both legal personality types
    
    When the user searches for Bank and Brokerage House contracts
    Then the search returns results for both institution types
    
    When the user verifies search within header in desktop version
    Then the client-contract search in header works as presented throughout the Acticenter module