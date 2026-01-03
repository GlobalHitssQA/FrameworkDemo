Feature: Prospect Search Functionality

  Scenario: Search prospects and verify results display
    Given the user has accessed Acticenter
    When the user enters at least 2 characters in the prospect search field
    Then the search executes against Salesforce database
    And the results display showing prospect names and electronic emails
    And matching characters in prospect names are displayed in bold
    And the first 5 matching results are visible without scrolling
    And scroll appears if more than 6 results exist to view additional coincidences
    And each result displays complete prospect name and electronic email address