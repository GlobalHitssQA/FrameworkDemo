Feature: Responsive Value and Composition Component

  Scenario: Verify value and composition component adapts correctly to different screen resolutions
    Given the user is authenticated and has a contract selected
    When the user opens the component at desktop resolution 1920x1080
    Then the component should display correctly at desktop resolution
    When the user resizes the browser to 1366x768
    Then the component should adapt correctly maintaining all elements visible and functional
    When the user resizes the browser to 1024x768
    Then the component should continue displaying correctly with appropriate responsive adjustments
    When the user triggers the popup at each resolution
    Then the breakdown popup should deploy correctly at all tested resolutions
    And all component elements should be visible and accessible without being cut off overlapped or out of view