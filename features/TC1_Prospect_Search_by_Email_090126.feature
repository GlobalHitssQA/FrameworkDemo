Feature: Prospect Search by Email
  As an advisor in Acticenter
  I want to search for prospects using email address
  So that I can find and select prospects from Salesforce

  Scenario: Search for a prospect using a valid email address
    Given I am logged in as an advisor in Acticenter
    And I access the prospect search functionality
    When I enter a valid email address "prospect@example.com" in the search field
    And I verify the search field contains at least 2 characters
    And I click on the search icon to execute the search
    Then I should see the search results displayed
    And I should see the prospect information including name and email