Feature: Prospect Email Validation Error Message
  As an advisor using the Actinver application
  I want to see a clear error message when selecting a prospect without an email address
  So that I understand why the prospect cannot be processed

  Background:
    Given the user is logged in as an advisor with access to Actinver application

  Scenario: Display error message when selected prospect lacks email address in Salesforce
    Given the main dashboard is displayed with prospect search functionality available
    When the user enters more than 2 characters in the prospect search field
    Then the system displays a list of matching prospects from Salesforce
    When the user selects a prospect that does not have an email address registered
    And the user attempts to proceed with the selected prospect
    Then the system displays an error message indicating the prospect lacks an email address
    And the error message clearly states the prospect cannot be processed due to missing email in Salesforce
    And the system remains on the dashboard view
    And the user can perform a new search or select a different prospect