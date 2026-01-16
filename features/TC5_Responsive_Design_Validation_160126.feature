Feature: Responsive Design Validation
  As a user
  I want the GitHub Profile Search application to adapt to different screen sizes and orientations
  So that I can use it on any device

  Scenario: Validate responsive layout across desktop and mobile devices
    Given the user navigates to the GitHub Profile Search application
    When the user views the application in desktop resolution 1920x1080
    Then all components should be visible and properly distributed
    When the user searches for an existing GitHub user in desktop view
    Then the metrics dashboard and profile information and followers list should display correctly in horizontal layout
    When the user resizes the browser to tablet resolution 768x1024
    Then components should reorganize without overlapping or clipping
    When the user resizes the browser to mobile portrait resolution 375x667
    Then the interface should adapt to vertical layout for optimal mobile viewing
    And the search input and button should be accessible with appropriate touch size
    When the user changes to mobile landscape orientation 667x375
    Then the interface should adapt automatically maintaining functionality
    When the user scrolls in both portrait and landscape orientations
    Then vertical scroll should work correctly to access all content
    When the user performs a complete search on mobile device
    Then all functionalities should work correctly including links and metrics and followers list