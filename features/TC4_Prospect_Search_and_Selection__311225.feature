Feature: Prospect Search and Selection Flow
  As an advisor in Acticenter
  I want to search for prospects in the Salesforce database
  So that I can select a valid prospect and continue with the business process

  Scenario: Complete flow from prospect search to selection and process continuation
    Given the user is logged in as an advisor with access to Salesforce database
    And the user accesses the prospect search functionality in Acticenter
    Then the prospect search screen is displayed with the search field enabled
    When the user enters a search term with more than 2 characters
    Then the system displays the first 5 matching prospects from Salesforce
    And the prospect information displays name and email address
    When the user selects a valid prospect with an email address from the results
    Then the system highlights the selected prospect
    When the user confirms the selection to continue with the process
    Then the system navigates to the next screen in the business flow
    And the selected prospect information is carried forward to the next step