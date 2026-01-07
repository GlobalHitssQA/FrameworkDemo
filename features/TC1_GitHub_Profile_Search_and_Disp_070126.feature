Feature: GitHub Profile Search and Display
  As a user of the GitHub Profile Search component
  I want to search for GitHub users and view their complete profile information
  So that I can access relevant information about GitHub users

  Scenario: Validate successful search and complete profile information display for an existing GitHub user
    Given the user navigates to the GitHub Profile Search component
    And the search component is displayed with a text input field and search button
    When the user enters a valid existing GitHub username "octocat" in the search input field
    And the user clicks the search button to perform the search
    Then the system queries the GitHub API and displays the profile loading process
    And the user profile information section displays the avatar image
    And the user profile information section displays the full name
    And the user profile information section displays the username with @ symbol
    And the user profile information section displays the biography
    And the user profile information section displays the location
    And the user profile information section displays the company
    And the user profile information section displays the web link
    And the user profile information section displays the Follow button
    And all profile fields contain expected data or show "Not available" for empty fields