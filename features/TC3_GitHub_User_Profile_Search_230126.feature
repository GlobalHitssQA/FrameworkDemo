Feature: GitHub User Profile Search

  Scenario: Search for a GitHub user and view their profile information
    Given the user is on the GitHub search page
    When the user searches for a username in the search box
    And the user clicks on the user result from the search results
    Then the user profile page should be displayed
    And the user should see the profile metrics including followers and repositories
    And the user should see the user personal information