Feature: GitHub Profile Search Empty and Invalid Input Handling

  Scenario: Verify error handling for empty search and non-existent user
    Given the user navigates to the GitHub profile search component
    And the search interface is displayed with an empty input field
    When the user leaves the input field empty and clicks the search button
    Then the system prevents the search or displays a validation message
    When the user enters a non-existent GitHub username
    And the user clicks the search button to trigger the API call
    Then the system displays a user not found error message
    And the error message follows the platform design standards