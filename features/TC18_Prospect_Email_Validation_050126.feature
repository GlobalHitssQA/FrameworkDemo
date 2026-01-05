Feature: Prospect Email Validation

  Scenario: Verify email format and display in prospect search results
    Given the user navigates to the prospect search screen
    When the user performs a search for prospects
    Then the search results should display a list of prospects
    And each prospect result should show name and email address
    And all displayed email addresses should follow valid email format
    When the user searches for a prospect without an email address in Salesforce
    Then the prospect should not appear in the search results
    When the user searches for prospects with email matching specific criteria
    Then the matching characters in email addresses should be properly highlighted