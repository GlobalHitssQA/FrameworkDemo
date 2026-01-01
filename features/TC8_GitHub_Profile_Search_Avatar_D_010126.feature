Feature: GitHub Profile Search Avatar Display Verification

  Scenario: Verify user avatar is displayed correctly after searching for a GitHub profile
    Given the GitHub Profile Search component is open
    When I enter a valid GitHub username in the search field
    And I click the search button to retrieve user profile data
    Then the left profile section should be visible with user details
    And the user avatar should be loaded and displayed correctly
    And the avatar image should load without errors or broken image icons