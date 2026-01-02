Feature: Responsive design verification for GitHub profile search

  Scenario: Verify GitHub profile search responsive layout across different viewport sizes
    Given the user opens the GitHub profile page on desktop viewport with resolution 1920x1080
    When the user searches for a GitHub user profile on desktop view
    Then all profile information metrics and followers list are displayed in the desktop layout
    When the user resizes the browser to mobile portrait viewport 375x667
    Then the layout adapts responsively with stacked or adjusted sections
    And all content is accessible and readable without horizontal scrolling
    When the user rotates to mobile landscape orientation 667x375
    Then the layout adapts to landscape mode maintaining readability
    When the user tests search scroll and link interactions in mobile orientations
    Then all interactive elements function correctly across all viewport sizes