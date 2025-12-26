Feature: GitHub User Search Error Handling
  As a user of the GitHub Profile Finder
  I want to see a friendly error message when searching for non-existent users
  So that I understand the search result and can try again

  Background:
    Given the GitHub API is available and accessible
    And the system has error handling configured for API responses

  Scenario: Search for a non-existent GitHub user displays error message
    Given I am on the GitHub profile search component
    And I can see the search input and search button with magnifying glass icon
    When I enter a non-existent username "xyznonexistentuser12345abc"
    Then the entered text is displayed in the search input
    When I click the search button with magnifying glass icon
    Then the system attempts to query the GitHub API
    And the system displays an empty state or friendly error message indicating user not found
    And no profile metrics are displayed
    And no profile information is shown
    And the dashboard remains empty without incorrect or default values