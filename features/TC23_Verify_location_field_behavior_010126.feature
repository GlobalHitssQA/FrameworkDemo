Feature: Verify location field behavior when user has no location data

  Scenario: Display profile correctly when location field is not available
    Given the user navigates to the GitHub profile search application
    When the user searches for a GitHub username without location data
    Then the profile page loads successfully
    And the user information section is displayed on the left side
    And the location field appears empty or displays placeholder text
    And other profile fields display correctly without being affected by missing location