Feature: GitHub Profile Search Mobile Landscape Orientation

  Scenario: Verify application responsiveness in mobile landscape mode
    Given the user accesses the GitHub profile search application on a mobile device
    When the user rotates the device to landscape orientation
    And the user searches for a valid GitHub username "torvalds"
    Then the search functionality works correctly in landscape mode
    And the dashboard metrics are displayed properly in landscape orientation
    And the user information section displays correctly with avatar username biography location company and website
    And the followers list is accessible and scrollable without layout issues