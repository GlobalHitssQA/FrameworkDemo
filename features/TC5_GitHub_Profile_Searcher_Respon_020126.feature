Feature: GitHub Profile Searcher Responsive Layout

  Scenario: Verify responsive layout across different viewport sizes
    Given the user opens the GitHub profile search component on a desktop browser with resolution 1920x1080
    When the user searches for a valid GitHub user "octocat"
    Then all sections are displayed correctly with metrics dashboard user details and followers list
    And no horizontal scrolling is required and all elements fit within viewport
    When the user resizes the browser window to tablet breakpoint 768 pixels width
    Then the layout adapts responsively with adjusted spacing
    When the user resizes the browser to mobile portrait view 375x667
    Then the layout adapts to mobile portrait with sections stacked vertically
    And the search functionality works correctly in mobile portrait orientation
    When the user rotates to mobile landscape view 667x375
    Then the layout adapts to landscape orientation maintaining usability
    And responsive images and avatars scale appropriately across all viewports
    When the user tests interactivity on mobile views
    Then all interactive elements remain clickable and functional
    When the user returns to desktop view 1920x1080
    Then the layout returns to full desktop version with all sections properly positioned