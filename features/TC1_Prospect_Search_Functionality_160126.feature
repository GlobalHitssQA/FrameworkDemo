Feature: Prospect Search Functionality

  Scenario: Validate prospect search executes correctly with more than 2 characters and search button
    Given the user is logged in as a Patrimonial, Private or Wealth Management advisor
    And the user is on the advisor dashboard
    When the user navigates to the prospect search field
    Then the search field should be visible and active
    When the user enters "Juan" in the search field
    Then the characters should be displayed correctly in the search field
    When the user clicks the search button
    Then the system should query the Salesforce database
    And the first 5 matching prospects should be displayed with name and email
    And matching characters should be highlighted in bold
    When there are more than 5 matches
    Then the scroll should be enabled starting from the sixth result
    And the user should be able to navigate through all results