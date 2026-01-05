Feature: Prospect Search Visibility by User Role
  As a system administrator
  I want to ensure that support bankers cannot access prospect search functionality
  So that role-based access control is properly enforced

  Scenario: Support banker cannot view or access prospect search functionality
    Given the support banker is logged into Acticenter
    When the support banker navigates to the main dashboard
    Then the prospect search functionality should not be displayed
    And the prospect search should not be accessible through alternative navigation paths