Feature: Search for existing GitHub user
  As a user
  I want to search for a GitHub profile using the search component
  So that I can view their profile information and metrics

  Scenario: Validate search for an existing GitHub user
    Given I am on the GitHub profile search component page
    And the search input and search button with magnifying glass icon are visible
    When I enter a valid GitHub username "octocat" in the search input
    Then the entered text "octocat" is displayed correctly in the input
    When I click on the search button with magnifying glass icon
    Then the system initiates the API request to fetch the user profile
    And the user profile is displayed with avatar, full name, username, bio, location, company, web link and Follow button
    And the total metrics are displayed showing Repos, Followers, Following and Gists values
    And the Requests indicator is updated showing the current count over the total limit