Feature: Search for non-existent GitHub user

  Scenario: System displays error message when searching for a non-existent user
    Given the user navigates to the GitHub search page
    When the user enters a non-existent username "thisuserdoesnotexist123456789xyz" in the search field
    And the user clicks the search button
    And the user filters results by Users
    Then the system displays a friendly error message indicating no users were found
    And no profile data is displayed on the page