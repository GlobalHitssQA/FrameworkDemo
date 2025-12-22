Feature: Client and Contract Search Functionality
  As an authenticated user in Acticenter
  I want to search for clients and contracts using the magnifying glass icon
  So that I can quickly access client information and contract details across all views

  Background:
    Given the user is authenticated in Acticenter
    And the client and contract database is accessible
    And the search functionality via magnifying glass is implemented in all views

  Scenario: Validate search functionality using magnifying glass icon across all views
    Given the user is on the Acticenter desktop view
    When the user locates the magnifying glass icon in the header
    Then the magnifying glass icon should be visible according to the Acticenter module screens
    
    When the user clicks on the magnifying glass icon
    Then the system should display the general client screen or the BP or contract search option
    
    When the user enters search criteria to locate a specific client
    Then the system should display search results matching the entered criteria
    
    When the user selects a client from the search results
    Then the system should display the general screen of the selected client
    
    When the user selects the contract to view or operate
    Then the system should load the selected contract
    And the contract value component should display updated information
    
    When the user validates the search function in responsive landscape view
    Then the magnifying glass icon should be present and functional
    
    When the user validates the search function in responsive portrait view
    Then the magnifying glass icon should be present and functional
    
    When the user verifies the contract value component after selecting a contract via magnifying glass
    Then the contract value component should reflect the information of the newly selected contract