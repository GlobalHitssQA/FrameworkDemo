Feature: GitHub Profile Search API Integration

  Scenario: Verify API response structure and UI data mapping for user profile search
    Given the user is on the GitHub search page
    When the user enters a known GitHub username "torvalds" in the search field
    And the user clicks the search button
    And the user navigates to the Users filter to find user profiles
    And the user clicks on the user profile link
    Then the API response should contain all required profile fields
    And the profile information should be correctly displayed in the UI
    And the user metrics should be visible in the profile section