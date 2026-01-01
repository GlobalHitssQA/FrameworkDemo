Feature: Verify biography field display for user without biography

  Scenario: Verify biography field appears empty or shows 'No disponible' for user without bio
    Given the user accesses the GitHub profile search application
    When the user searches for a GitHub username that has no biography
    Then the profile loads successfully
    And the user information section is displayed
    And the biography field appears empty or displays 'No disponible' text
    And other profile fields with data are displayed correctly