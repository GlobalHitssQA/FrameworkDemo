Feature: Prospect Search Email Validation
  As an advisor from Banca Patrimonial, Privada or Wealth Management
  I want to search for prospects in Acticenter
  So that only prospects with registered email addresses are displayed in search results

  Background:
    Given the advisor is authenticated in Acticenter
    And at least one prospect without email exists in Salesforce database associated to the advisor
    And at least one prospect with email exists in Salesforce database associated to the advisor

  Scenario: Verify prospects without email are not displayed in search results
    Given the advisor has verified in Salesforce that prospect "TestProspectNoEmail" has no email registered
    When the advisor navigates to the prospect search functionality
    And the advisor enters more than 2 characters "TestProspectNoEmail" in the search field
    And the advisor clicks the search button or presses Enter
    Then the system executes the search in Salesforce database
    And the search results are displayed on screen
    And the prospect "TestProspectNoEmail" without email is not displayed in the results list
    And only prospects with registered email addresses are displayed in the results