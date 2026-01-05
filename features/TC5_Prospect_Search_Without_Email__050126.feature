Feature: Prospect Search Without Email Key

  Scenario: Verify prospect without email key is not displayed in search results
    Given a prospect exists in Salesforce DB without an email key
    And I am logged in to Acticenter as an advisor with access to that prospect
    When I navigate to the prospect search field
    And I enter search criteria matching the prospect without email key
    Then the prospect without email key should not be displayed in the results