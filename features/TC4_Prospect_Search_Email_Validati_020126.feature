Feature: Prospect Search Email Validation
  As an advisor
  I want to search for prospects in Acticenter
  So that I can verify only prospects with electronic email keys are displayed

  Scenario: Prospect without electronic email key should not appear in search results
    Given a prospect exists in Salesforce without an electronic email key
    And I am logged in to Acticenter as an advisor
    When I navigate to the prospect search field
    And I search for the prospect by name
    Then the prospect without email should not appear in search results
    And other prospects with email keys should be displayed normally