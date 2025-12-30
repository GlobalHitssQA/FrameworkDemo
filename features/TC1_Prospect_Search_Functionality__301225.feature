Feature: Prospect Search Functionality Validation

  Scenario: Validate that prospect search allows searches when more than 2 characters are entered and displays matching results
    Given the user is logged in as an advisor in Acticenter
    And the Salesforce database is accessible
    And test prospects exist in Salesforce database with valid data
    When the user navigates to the prospect search screen
    Then the prospect search screen is displayed with search field available
    When the user enters exactly 2 characters in the prospect search field
    Then the system does not trigger search and no results are displayed
    When the user enters 3 or more characters in the prospect search field
    Then the system triggers the search automatically or enables search button
    When the user clicks search button or presses enter to execute the search
    Then the system displays list of matching prospects from Salesforce database
    And the search results show prospect name and email address
    And the first 5 coincidences are presented on screen
    And scroll is enabled if more than 6 results exist