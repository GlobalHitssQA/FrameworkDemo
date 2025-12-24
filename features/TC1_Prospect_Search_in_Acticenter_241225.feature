Feature: Prospect Search in Acticenter
  As an advisor from Banca Patrimonial, Privada or Wealth Management
  I want to search for prospects in Salesforce
  So that I can validate the system behavior when no results are found

  Background:
    Given the user is logged in as an advisor with access to Acticenter
    And the user has permissions for Banca Patrimonial, Privada or Wealth Management

  Scenario: Display no results message when searching for a non-existent prospect
    Given the user is on the prospect search screen in Acticenter
    When the user enters a search term with more than 2 alphanumeric characters that does not match any existing prospect
    And the user clicks on the search button or presses enter
    Then the system should execute the search in the Salesforce database
    And a message should be displayed indicating that no results were found for the search query