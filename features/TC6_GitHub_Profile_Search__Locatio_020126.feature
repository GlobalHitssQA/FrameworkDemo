Feature: GitHub Profile Search - Location Field Display

  Scenario: Verify location field displays empty when user has no location data
    Given the GitHub profile search application is loaded
    When I enter a GitHub username with no location information
    And I click the search button
    Then the user profile should be displayed
    And the location field should be present in the user information section
    And the location field should appear empty without placeholder text