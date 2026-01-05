Feature: Support Banker Role Restrictions
  As a system administrator
  I want to ensure support bankers cannot access prospect search functionality
  So that role-based access control is properly enforced

  Scenario: Support banker cannot access prospect search functionality
    Given I am logged in to Acticenter as a support banker user
    When I navigate to the main dashboard
    Then the dashboard should be displayed with support banker functionalities
    And the prospect search functionality should not be visible
    And I should not be able to access prospect search options