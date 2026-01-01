Feature: Verify Gists Count in GitHub Profile Dashboard

  Scenario: User verifies that the Gists metric displays the correct count for a GitHub user
    Given the user navigates to the GitHub Profile Search component
    And the search component loads successfully
    When the user enters a valid GitHub username that has public gists
    And the user clicks the search button to fetch the profile
    Then the system retrieves user data from the GitHub API
    And the dashboard displays the Gists metric prominently
    And the Gists count matches the actual number of public gists from the API response