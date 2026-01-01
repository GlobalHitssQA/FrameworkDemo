Feature: Verify followers list displays usernames correctly

  Scenario: Each follower entry displays their username properly formatted
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username that has followers
    And the user clicks the search button to retrieve the profile
    Then the followers list is displayed in the right section
    And each follower entry displays their username
    And all usernames are properly formatted and readable