Feature: GitHub Profile Search and Display

  Scenario: Search and view an existing GitHub user profile
    Given the user is on the GitHub Profile Finder component
    When the user enters a valid GitHub username "octocat" in the search field
    And the user clicks the search button
    Then the system should display a loading indicator
    And the profile information should be loaded successfully
    And the left section should display the user personal details
    And the dashboard should display the user metrics
    And the right section should display the followers list