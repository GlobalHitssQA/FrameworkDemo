Feature: Prospect Search Validation
  As an Advisor from Banca Patrimonial, Privada or Wealth Management
  I want to search for prospects in Acticenter
  So that I can validate the system handles no results scenarios correctly

  Background:
    Given the user is authenticated as an Advisor in Acticenter

  Scenario: Validate no results message when search finds no matches
    Given the user is on the prospect search screen in Acticenter
    When the user enters more than 2 alphanumeric characters that do not match any existing prospect "XYZABC123"
    And the user clicks the search button or presses enter
    Then the system executes the search in the Salesforce database
    And a no results message is displayed indicating that no matches were found