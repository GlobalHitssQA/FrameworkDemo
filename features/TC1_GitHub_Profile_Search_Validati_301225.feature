Feature: GitHub Profile Search Validation

  Scenario: Validate that searching for an existing GitHub user displays all profile information correctly
    Given the GitHub Profile Search component is accessible
    When I enter a valid existing GitHub username "octocat" in the search input field
    And I click the search button to initiate the search
    Then the metrics dashboard displays the correct values for Repos, Followers, Following, and Gists
    And the user avatar image is displayed in the left section
    And the full name and username with @ prefix are visible and correctly formatted
    And the biography, location, company, and web link are displayed
    And the Follow button is present and functional
    And the API request limit indicator is displayed