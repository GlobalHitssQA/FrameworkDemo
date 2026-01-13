Feature: Prospect Search Functionality Validation

  Scenario: Validate prospect search activates correctly after entering more than 2 characters
    Given the advisor is logged into Acticenter with Banca Patrimonial access
    And the advisor navigates to the Salesforce prospects list
    When the advisor locates the prospect search field
    Then the search field should be visible and enabled
    When the advisor enters 2 characters in the search field
    Then the system should not display any search results
    When the advisor enters more than 2 characters in the search field
    Then the system should automatically perform the search
    And the system should display the last 5 searches with prospect name and email
    And the first 5 matching results should be displayed
    And the matching characters in prospect names should be highlighted in bold
    And a scroll option should be available if there are more results