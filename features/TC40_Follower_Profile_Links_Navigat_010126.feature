Feature: Follower Profile Links Navigation

  Scenario: Verify follower profile links redirect correctly to GitHub profiles
    Given the user is on the GitHub Profile Search component
    When the user enters a valid GitHub username with followers in the search input
    And the user clicks the search button
    Then the profile data loads successfully with the followers list displayed
    And the followers list shows avatars usernames and clickable profile links
    When the user clicks on the first follower profile link
    Then the system opens the GitHub profile page for that follower
    And the opened profile page matches the clicked follower username
    When the user returns to the search component
    And the user clicks on a different follower link
    Then the system redirects to the new follower GitHub profile correctly
    When the user tests multiple follower links
    Then all follower links redirect properly to their respective GitHub profiles