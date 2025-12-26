Feature: GitHub User Not Found Error Handling
  As a user of the GitHub Profile Search component
  I want to see a friendly error message when searching for a non-existent user
  So that I understand the profile was not found

  Background:
    Given the GitHub profile search component is accessible
    And I have an active connection to the GitHub API

  Scenario: Display error message when searching for non-existent GitHub user
    Given I am on the GitHub profile search page
    When I enter "usuarioquenoexiste123456789" in the search input field
    And I click the search button with magnifying glass icon
    Then the system should query the GitHub API for the entered username
    And I should see the 404 error page with "This is not the web page you are looking for" image
    And I should see a search box to find code, projects and people
    And I should not see any user profile information
    And I should not see any metrics dashboard
    And I should not see any followers list