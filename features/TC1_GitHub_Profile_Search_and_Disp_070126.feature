Feature: GitHub Profile Search and Display
  As a user of the GitHub Profile Finder
  I want to search for GitHub users by username
  So that I can view their complete profile information

  Scenario: Validate successful search and complete profile information display for an existing GitHub user
    Given the user navigates to the GitHub Profile Search component
    And the search component is displayed with a text input field and a search button
    When the user enters a valid GitHub username "octocat" in the search input field
    And the user clicks the search button
    Then the user profile section displays on the left side
    And the profile shows the avatar image
    And the profile shows the full name and username
    And the profile shows the biography
    And the profile shows the location and company
    And the profile shows the web link
    And the Follow button is present and functional