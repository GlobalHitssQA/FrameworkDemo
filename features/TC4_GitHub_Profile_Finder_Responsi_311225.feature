Feature: GitHub Profile Finder Responsive Design Validation

  Scenario: Validate responsive design across different screen resolutions and orientations
    Given the user accesses the GitHub profile finder component on a desktop browser with resolution 1920x1080
    When the user views the interface layout
    Then the left section displays user details
    And the metrics dashboard is displayed at the top
    And the followers list is displayed in the right section

    When the user searches for a valid GitHub username "octocat" on desktop
    Then all profile elements are displayed correctly distributed and aligned

    When the user resizes the browser window to tablet resolution 768x1024
    Then the interface adjusts dynamically maintaining readability and functionality

    When the user accesses the component from a mobile device in portrait orientation 375x667
    Then the interface reorganizes vertically
    And the search bar is displayed first
    And the metrics dashboard is displayed below the search bar
    And the user information is displayed below the dashboard
    And the followers list with scroll is displayed at the bottom

    When the user searches for a valid GitHub username "octocat" in portrait mode
    Then all elements are displayed correctly stacked vertically and are functional

    When the user rotates the mobile device to landscape orientation 667x375
    Then the interface adapts to horizontal orientation redistributing elements

    When the user verifies scroll functionality in the followers list on mobile
    Then the followers list allows smooth vertical scrolling when content exceeds container size

    When the user verifies all interactive elements across all resolutions
    Then all buttons are accessible and respond to user actions
    And all input fields are accessible and accept user input
    And all links are accessible and navigate correctly