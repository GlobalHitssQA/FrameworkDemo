Feature: GitHub Profile Search
  As a user
  I want to search for GitHub profiles using a username
  So that I can view user information and metrics

  Scenario: Validate successful search for an existing GitHub profile
    Given the user is on the GitHub Profile Finder application
    And the search interface is displayed with a text input field and a search button with magnifying glass icon
    When the user enters a valid existing GitHub username "octocat" in the search field
    Then the entered text "octocat" is displayed correctly in the input field
    When the user clicks on the search button with magnifying glass icon
    Then the system initiates a query to the GitHub API and displays a loading indicator
    And the system retrieves the profile information from GitHub API
    Then the dashboard displays the total metrics including Repos, Followers, Following and Gists with correct numeric values
    And the left section displays user details including Avatar, Full Name, Username, Biography, Location, Company, Web Link and Follow button
    And the Requests indicator is updated showing the API rate limit consumed