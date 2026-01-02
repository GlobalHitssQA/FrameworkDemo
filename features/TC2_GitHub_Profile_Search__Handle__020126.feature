Feature: GitHub Profile Search - Handle Non-Existent User

  Scenario: Search for a non-existent GitHub user
    Given the GitHub Profile Search component is displayed
    When I enter a non-existent username "thisisnotarealuser12345xyz" in the search field
    And I click the search button
    And I wait for the API response
    Then an error message or empty state should be displayed
    And no profile data should be visible