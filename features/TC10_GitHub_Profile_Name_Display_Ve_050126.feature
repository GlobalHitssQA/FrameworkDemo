Feature: GitHub Profile Name Display Verification

  Scenario: Verify full name and username are displayed correctly after profile search
    Given the GitHub profile search component is loaded
    When I enter a valid GitHub username in the search field
    And I click the search button
    Then the user full name should be displayed in the profile details area
    And the username should be displayed with @ prefix
    And both name fields should be positioned and formatted correctly