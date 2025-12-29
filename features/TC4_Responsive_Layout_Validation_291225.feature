Feature: Responsive Layout Validation
  As a user
  I want to verify that the GitHub Profile Search application adapts correctly to different screen sizes
  So that I can use the application on any device

  Scenario: Validate responsive behavior and layout adaptation across different screen sizes and device orientations
    Given the user accesses the GitHub profile search component on a Desktop browser with resolution 1920x1080
    Then the interface displays in desktop layout with proper alignment of search bar and metrics dashboard
    And all components are visible and properly arranged without horizontal scrolling
    When the user resizes the browser window to tablet dimensions 768x1024
    Then the layout adapts responsively rearranging components to fit the reduced screen width
    When the user accesses the component on a Mobile device in Portrait mode 375x667
    Then the interface adapts to mobile portrait layout with vertical stacking of components
    When the user rotates the mobile device to Landscape orientation 667x375
    Then the layout adjusts to landscape mode optimizing component arrangement for horizontal viewing
    And the followers list allows vertical scrolling when content exceeds container size
    And all interactive elements remain accessible and functional across all viewport sizes