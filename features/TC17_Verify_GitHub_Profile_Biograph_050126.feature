Feature: Verify GitHub Profile Biography Display
  As a user of the GitHub profile search component
  I want to search for users without biography data
  So that I can verify the biography field displays correctly when empty

  Scenario: Display empty or unavailable biography for user without bio data
    Given the GitHub profile search component is displayed
    When I enter a GitHub username that has no biography data
    And I click the search button to retrieve the profile
    Then the profile is successfully retrieved from GitHub API
    And the user details section is visible
    And the biography field is displayed in the profile details
    And the biography field shows empty or not available message