Feature: Prospect Search Functionality

  Scenario: Verify search execution by clicking icon and pressing Enter key
    Given the advisor user is logged in to Acticenter
    When the user navigates to the prospect search section
    Then the search field and search icon should be displayed
    When the user enters "John" in the search field
    And the user clicks the search icon
    Then search results from Salesforce should be displayed
    When the user clears the search field
    And the user enters "Mary" in the search field
    And the user presses the Enter key
    Then search results from Salesforce should be displayed
    And both search methods should produce identical behavior