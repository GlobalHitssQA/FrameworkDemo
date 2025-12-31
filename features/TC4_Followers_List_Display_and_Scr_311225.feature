Feature: Followers List Display and Scroll Functionality

  Scenario: Validate that the followers list displays correctly and allows scrolling
    Given the user accesses the GitHub profile search application
    When the user enters a username with many followers in the search field
    And the user clicks the search button
    Then the followers list should be displayed in the right section
    And each follower should display an avatar username and profile link
    And the followers list should enable vertical scrolling when content exceeds container
    When the user scrolls down in the followers list
    Then additional followers should become visible
    When the user clicks on a follower profile link
    Then the user should be redirected to the GitHub profile page