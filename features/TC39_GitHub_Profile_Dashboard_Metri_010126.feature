Feature: GitHub Profile Dashboard Metrics Display

  Scenario: Verify all dashboard metrics are displayed with correct highlighting after user search
    Given the user navigates to the GitHub Profile Search component
    And the search component is loaded with input field and search button visible
    When the user enters a valid GitHub username in the search input field
    And the user clicks the search button with the magnifying glass icon
    Then the system retrieves the user profile data from GitHub API
    And the dashboard section displays with all four metrics visible
    And the Repos metric is highlighted and displays the correct count
    And the Followers metric is highlighted and displays the correct count
    And the Following metric is highlighted and displays the correct count
    And the Gists metric is highlighted and displays the correct count
    And all four metrics maintain visual consistency in highlighting style