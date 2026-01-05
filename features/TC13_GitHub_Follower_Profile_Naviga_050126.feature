Feature: GitHub Follower Profile Navigation

  Scenario: Navigate to a follower's GitHub profile from the followers list
    Given the GitHub profile search interface is displayed
    When I search for a GitHub user with at least one follower
    Then the profile loads successfully with followers list visible
    And at least one follower is displayed with avatar and username
    When I hover over the follower username to verify clickable state
    Then the cursor changes to pointer indicating the element is clickable
    When I click on the follower profile link
    Then the system redirects to the corresponding GitHub profile page
    And the opened page displays the correct follower GitHub profile information