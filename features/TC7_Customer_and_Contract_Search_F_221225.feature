Feature: Customer and Contract Search Functionality

  As a user of Acticenter
  I want to search for customers and contracts using the magnifying glass icon
  So that I can quickly access customer and contract information across all views

  Background:
    Given the user is authenticated in Acticenter
    And the customer and contract database is accessible

  Scenario: Search for customer and contract using magnifying glass icon in desktop view
    Given the user is on the Acticenter desktop view
    When the user locates the magnifying glass icon in the header
    Then the magnifying glass icon should be visible
    When the user clicks on the magnifying glass icon
    Then the system displays the customer general screen or BP/contract search option
    When the user enters search criteria for a specific customer
    Then the system displays search results matching the entered criteria
    When the user selects a customer from the search results
    Then the system displays the general screen of the selected customer
    When the user selects the contract to view or operate
    Then the system loads the selected contract
    And the contract value component displays updated information

  Scenario: Validate search functionality in responsive views
    Given the user is on the Acticenter application
    When the user switches to responsive landscape view
    Then the magnifying glass icon should be present and functional
    When the user switches to responsive portrait view
    Then the magnifying glass icon should be present and functional

  Scenario: Verify contract value component updates after search selection
    Given the user has searched and selected a customer
    When the user selects a contract using the magnifying glass search
    Then the contract value component should reflect the newly selected contract information