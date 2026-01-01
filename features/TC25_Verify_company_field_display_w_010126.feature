Feature: Verify company field display when user has no company information

  Scenario: Company field displays appropriately when user profile lacks company data
    Given the GitHub profile search application is loaded
    When I search for a GitHub user without company information
    Then the user profile should load successfully
    And the user information section should be displayed
    And the company field should appear empty or display "No disponible"
    And other profile fields with data should be displayed correctly