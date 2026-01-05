Feature: Prospect Search Without Email Validation
  As an advisor
  I want to search for prospects in Acticenter
  So that only prospects with valid email addresses are displayed

  Scenario: Prospect without email address should not appear in search results
    Given a test prospect exists in Salesforce database without email address
    And I am logged in to Acticenter as an advisor
    When I navigate to the prospect search field
    And I search for the prospect that has no email address
    Then the prospect without email address should not be displayed in search results