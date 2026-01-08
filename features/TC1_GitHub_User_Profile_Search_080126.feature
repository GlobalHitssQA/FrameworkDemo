Feature: GitHub User Profile Search
  As a user
  I want to search for GitHub user profiles
  So that I can view their complete profile information

  Scenario: Validate successful GitHub user profile search and complete profile information display
    Given I am on the GitHub profile search component
    And the search component displays with a text input field and a search button with magnifying glass icon
    When I enter a valid existing GitHub username in the search input field
    And I click the search button with magnifying glass icon
    Then the system initiates API call to GitHub and displays loading state
    And profile data is successfully retrieved from GitHub API
    And the user avatar image is displayed in the left section
    And the full name and username are displayed and correctly formatted
    And the biography section displays user description if available
    And the location and company information are displayed if available
    And the web link displays personal or portfolio URL if available
    And the Follow button is present and functional