Feature: GitHub Profile Search - Consecutive User Search Data Update

  Scenario: Verify dashboard updates completely when searching for different users consecutively
    Given the user is on the GitHub Profile Search application
    When the user searches for the first GitHub username "octocat"
    Then the profile information for "octocat" should be displayed
    And the dashboard metrics should show values for "octocat"
    When the user records the current metrics values
    And the user clears the search input field
    And the user searches for the second GitHub username "torvalds"
    Then the profile information for "torvalds" should be displayed
    And the dashboard metrics should be updated with "torvalds" data
    And the user details section should display "torvalds" information
    And the followers list should display "torvalds" followers
    And no residual data from "octocat" should remain visible