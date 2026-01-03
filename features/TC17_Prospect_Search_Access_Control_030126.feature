Feature: Prospect Search Access Control for Support Banker
  As a system administrator
  I want to restrict prospect search functionality for support bankers
  So that only authorized roles can perform prospect searches

  Scenario: Support banker cannot access prospect search functionality
    Given the user is logged in as a support banker
    When the user accesses the Acticenter dashboard
    Then the prospect search functionality should not be displayed
    And the user should not be able to access the search interface