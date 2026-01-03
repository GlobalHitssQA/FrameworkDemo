Feature: Support Banker Prospect Search Restriction
  As a system administrator
  I want to ensure support bankers cannot access prospect search functionality
  So that role-based access control is properly enforced

  Scenario: Support banker cannot access prospect search functionality
    Given the user is logged in to Acticenter as a support banker
    When the user navigates to the prospect management section
    Then the prospect search functionality should not be visible
    And no search input field should be displayed
    And no search button should be displayed