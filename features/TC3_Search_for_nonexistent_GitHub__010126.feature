Feature: Search for non-existent GitHub user

  Scenario: Verify empty state when searching for a user that does not exist
    Given the user is on the GitHub homepage
    When the user navigates to search for a non-existent username
    Then the page should display a 404 error page
    And the 404 image should be visible
    And a search input should be available on the error page
    And no profile data or metrics should be displayed