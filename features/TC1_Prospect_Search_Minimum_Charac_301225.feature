Feature: Prospect Search Minimum Character Validation
  As an Advisor user
  I want the prospect search to require a minimum of 2 characters
  So that I can get relevant search results from the Salesforce database

  Scenario: Validate minimum 2 character requirement for prospect search
    Given the user is logged in as an Advisor with access to Acticenter
    And the user navigates to the prospect search section
    When the user enters only 1 character in the prospect search field
    Then the system does not execute the search
    And no search results are displayed
    When the user clicks the search button with only 1 character entered
    Then the search is not initiated and the search field remains active
    When the user enters a second character to have 2 characters total
    Then the search functionality becomes enabled
    When the user executes the search with 2 characters
    Then the search results are displayed successfully
    And the results show prospect name and email address
    And the first 5 matches are visible on the screen
    And additional matches are accessible via scroll if more than 5 exist