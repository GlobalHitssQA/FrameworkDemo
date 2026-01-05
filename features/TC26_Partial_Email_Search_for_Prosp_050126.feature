Feature: Partial Email Search for Prospects in Acticenter
  As an advisor
  I want to search prospects by partial email address
  So that I can find matching prospects efficiently

  Scenario: Search prospects using partial email address
    Given I am logged into Acticenter as an advisor
    And the dashboard loads successfully with search functionality available
    When I enter a partial email address with at least 2 characters in the search field
    Then the system accepts the partial email input and initiates the search
    And all prospects with matching email addresses are displayed
    And the prospect name and electronic email address are shown for each result
    And the matching characters in the email are highlighted in bold
    And the search field accepts alphanumeric characters without maximum limit