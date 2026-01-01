Feature: Verify Repository Count in User Profile Dashboard

  Scenario: Validate that the repository count displayed matches the GitHub API response
    Given the user navigates to the GitHub profile search application
    And the user enters a valid GitHub username "torvalds" in the search field
    When the user clicks the search button to retrieve the profile
    Then the dashboard metrics section should be visible
    And the Repos count should be displayed in the metrics dashboard
    And the displayed repository count should match the GitHub API response
    And the repository count should match the count on the actual GitHub profile page