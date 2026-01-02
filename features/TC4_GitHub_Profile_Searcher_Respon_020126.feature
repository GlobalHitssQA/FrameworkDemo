Feature: GitHub Profile Searcher Responsive Design Verification

  Scenario: Verify responsive design across desktop and mobile viewports
    Given the user accesses the GitHub Profile Search component on a desktop browser with resolution 1920x1080
    When the interface is fully loaded
    Then the search component should be displayed
    And the metrics dashboard should be visible
    And the user details section should be displayed on the left
    And the followers list section should be displayed on the right
    When the user enters a valid GitHub username "octocat" in the search input
    And the user clicks the search button
    Then the profile information should be displayed correctly
    And all sections should be properly aligned and visible on desktop
    And the metrics dashboard should show Repos count
    And the metrics dashboard should show Followers count
    And the metrics dashboard should show Following count
    And the metrics dashboard should show Gists count
    When the user resizes the browser to mobile portrait resolution 375x667
    Then the interface should adapt responsively to mobile portrait layout
    And sections should be stacked vertically
    And the search input should be accessible in mobile portrait mode
    And the metrics dashboard should be readable in mobile portrait mode
    And the user details should be accessible in mobile portrait mode
    And the followers list should be accessible in mobile portrait mode
    When the user resizes the browser to mobile landscape resolution 667x375
    Then the interface should adapt to mobile landscape layout
    And all components should remain functional in mobile landscape orientation
    And the layout should maintain readability in landscape mode
    When the user clicks on a follower link
    Then the follower profile should be accessible
    When the user clicks the Follow button
    Then the Follow button should respond correctly across all device sizes