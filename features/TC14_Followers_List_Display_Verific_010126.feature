Feature: Followers List Display Verification
  As a user of the GitHub Profile Search application
  I want to see a list of followers displayed vertically in the right section
  So that I can easily browse through the user's followers

  Scenario: Verify followers list is displayed as a vertical list in the right section
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username with followers in the search field
    And the user clicks the search button to retrieve the profile
    Then the right section where the followers list is displayed should be visible
    And the followers list should be displayed as a vertical list
    And each follower entry should be visible in the list