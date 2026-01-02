Feature: Search non-existent GitHub user

  Scenario: Verify error handling when searching for a non-existent GitHub username
    Given the user navigates to the GitHub profile search component
    And the search input field and search button are visible
    When the user enters "nonexistentuser12345xyz" in the username search field
    And the user clicks the search button
    Then the system displays an error message indicating user was not found
    And no profile information is displayed
    And no user metrics are displayed
    And no followers list is displayed
    And the search input field remains accessible for a new search