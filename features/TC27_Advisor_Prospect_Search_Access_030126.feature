Feature: Advisor Prospect Search Access
  As an advisor user
  I want to access the prospect search functionality on Acticenter dashboard
  So that I can search for prospects within the system

  Scenario: Verify prospect search field is available for advisor role
    Given the user logs in to the system as an advisor user
    When the user navigates to Acticenter dashboard
    Then the prospect search field should be visible on the dashboard
    And the search field should be enabled and accept input
    And the search field should be positioned correctly within the dashboard layout