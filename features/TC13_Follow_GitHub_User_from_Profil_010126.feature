Feature: Follow GitHub User from Profile Search

  As a user of the GitHub Profile Search application
  I want to follow a GitHub user directly from the search results
  So that I can easily connect with developers on the GitHub platform

  Scenario: Click Follow button redirects to GitHub platform in new tab
    Given the user is on the GitHub profile search component
    When the user enters a valid GitHub username in the search input field
    And the user clicks the search button to load the profile
    Then the user profile is retrieved and displayed successfully
    When the user locates the Follow button in the user profile details section
    And the user clicks the Follow button
    Then the system redirects to the GitHub platform to follow the user
    And the GitHub follow page opens in a new browser tab