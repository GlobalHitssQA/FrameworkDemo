Feature: Followers list with functional scroll

  Scenario: Validate that the right section shows the followers list with functional scroll when the number of followers exceeds the container size
    Given I have access to the GitHub profile search component
    And the GitHub API is available and accessible
    When I search for a GitHub user "torvalds" who has multiple followers
    Then the system loads and displays the user profile with the followers list in the right section
    And the followers list is displayed vertically aligned with the main information component
    And each follower in the list displays their avatar image
    And each follower in the list displays their username
    And each follower in the list includes a direct link to their GitHub profile
    When I click on a specific follower link
    Then the system redirects correctly to the selected follower GitHub profile page
    And the followers list allows vertical scrolling when the number of followers exceeds the container size