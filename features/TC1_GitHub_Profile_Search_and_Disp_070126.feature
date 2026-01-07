Feature: GitHub Profile Search and Display
  As a user of the GitHub profile search component
  I want to search for a valid GitHub user
  So that I can view their complete profile information

  Scenario: Validate successful search and complete profile information display for an existing GitHub user
    Given I navigate to the GitHub profile search component
    And the search component loads with a text input field and a search button
    When I enter a valid existing GitHub username in the search input field
    And I click the search button with magnifying glass icon
    Then the system queries the GitHub API and loads the user profile
    And the left section displays the user avatar image
    And the left section displays the full name and username
    And the left section displays the biography field
    And the left section displays location and company information
    And the left section displays the web link
    And the Follow button is present and functional