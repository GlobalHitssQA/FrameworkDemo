Feature: Validate GitHub Profile Metrics Dashboard
  As a user of the GitHub Profile Finder
  I want to see the total metrics of a GitHub profile
  So that I can quickly understand the user's activity and reach

  Background:
    Given the GitHub API connection is active
    And the GitHub Profile Finder component is accessible

  @TC-003 @Functional @Metrics
  Scenario: Validate that dashboard displays all four profile metrics accurately
    Given I am on the GitHub Profile Finder page
    And the search input and search button are visible
    When I enter a valid GitHub username "torvalds" in the search field
    And I click the search button
    Then the system should retrieve the profile data from GitHub API
    And the dashboard should display the Repos metric with the correct value
    And the dashboard should display the Followers metric with the correct value
    And the dashboard should display the Following metric with the correct value
    And the dashboard should display the Gists metric with the correct value
    And all four metrics should match the data from GitHub API