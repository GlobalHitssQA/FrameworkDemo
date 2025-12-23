Feature: Contract Value Breakdown and Client-Contract Search Validation
  As a user authenticated in Acticenter
  I want to verify that contract items without monetary value display $0.00 correctly
  And validate the client-contract search function via magnifying glass icon in desktop and responsive views

  Background:
    Given the user is authenticated in Acticenter
    And contracts with items valued at $0.00 are available for testing
    And contracts of different types are available: Individual, Corporate, Bank, Brokerage House

  Scenario: Verify zero value items display and search functionality across all views
    Given I select a contract that has no monetary value in some applicable items
    When I view the total contract value component
    Then the contract value component should be visible
    
    When I open the contract value breakdown
    Then the popup with complete breakdown should be displayed
    
    When I verify items without monetary value
    Then all applicable contract items without balance should display $0.00 correctly
    And the format should show $0.00 with two decimal places
    
    When I close the popup and click the search magnifying glass in desktop version
    Then the general client or BP screen should be presented as currently shown in Acticenter
    
    When I select a contract from the search results
    Then the contract should be selected and displayed correctly
    
    When I switch to responsive view and press the search magnifying glass
    Then the general client screen should be presented as currently shown in Acticenter module
    
    When I select another contract from the search in responsive view
    Then the advisor should be able to select the contract to view or operate
    
    When I verify the search works for Individual and Corporate contracts
    Then the search should return results for both legal personality types
    
    When I verify the search works for Bank and Brokerage House contracts
    Then the search should return results for both institution types
    
    When I verify the search within the header in desktop version
    Then the client-contract search in the header should work as presented throughout the Acticenter module