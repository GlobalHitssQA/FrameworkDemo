Feature: Follower Profile Link Navigation
  As a user of the GitHub Profile Search component
  I want to click on a follower's profile link
  So that I can navigate to their GitHub profile page

  Scenario: Navigate to a follower's GitHub profile by clicking their profile link
    Given the user is on the GitHub profile search component
    When the user enters a valid GitHub username with followers in the search input
    And the user clicks the search button to load the profile
    Then the followers list should be visible in the right section
    And each follower entry should display a clickable profile link
    When the user clicks on a follower profile link
    Then the browser should navigate to the correct GitHub profile URL for that follower