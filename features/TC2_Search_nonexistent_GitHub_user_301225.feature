Feature: Search non-existent GitHub user validation

  Scenario: Validate error handling for non-existent GitHub user search
    Given the user is on the GitHub Profile Search component
    When the user enters a non-existent username "nonexistentuser999999xyz" in the search input
    And the user clicks the search button
    Then the system should display a user-friendly error message
    And no profile data should be displayed
    And no metrics dashboard should be visible
    And no follower list should be displayed
    And the search input should remain functional
    And the search button should remain functional