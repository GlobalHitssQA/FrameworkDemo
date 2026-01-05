Feature: Add New Prospect in Acticenter
  As an advisor
  I want to add a new prospect when search returns no results
  So that I can expand my client base

  Scenario: Successfully access new prospect creation form after unsuccessful search
    Given the advisor is authenticated in Acticenter system
    And the advisor is on the dashboard
    When the advisor performs a prospect search with no results
    And the advisor verifies the add new prospect option is available
    And the advisor clicks on the add new prospect button
    Then the system navigates to the new prospect creation form
    And the new prospect creation interface is displayed