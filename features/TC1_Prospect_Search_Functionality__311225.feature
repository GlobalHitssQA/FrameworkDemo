Feature: Prospect Search Functionality Validation

  As an advisor
  I want to search for prospects by entering more than 2 characters
  So that I can find and select prospects from the Salesforce database

  Scenario: Validate prospect search functionality with more than 2 characters
    Given the user is logged in as an advisor with access to Actinver application
    And the main dashboard is displayed with prospect search functionality available
    When the user navigates to the prospect search field
    Then the search field is displayed and enabled for input
    When the user enters "Mar" in the prospect search field
    Then the system triggers the search functionality and displays the search button
    When the user clicks on the search button to execute the search
    Then the system displays a list of matching prospects from Salesforce database
    And the system shows the last 5 searches with prospect name and email information
    And the system displays the first 5 matching coincidences on screen