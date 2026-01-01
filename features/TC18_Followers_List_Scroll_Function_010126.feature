Feature: Followers List Scroll Functionality
  As a user of the GitHub Profile Search application
  I want to scroll through a large followers list
  So that I can view all followers of a user with many followers

  Scenario: Verify scroll functionality on followers list for user with many followers
    Given the user navigates to the GitHub profile search component
    And the search component is loaded and displayed
    When the user enters a GitHub username with a large number of followers
    And the user clicks the search button to retrieve the profile
    Then the system retrieves the user profile with a large followers list
    And the followers list is displayed in the right section
    And a vertical scroll bar is visible on the followers list container
    When the user scrolls down through the followers list
    Then the list scrolls smoothly revealing additional followers
    And all followers can be accessed through scrolling