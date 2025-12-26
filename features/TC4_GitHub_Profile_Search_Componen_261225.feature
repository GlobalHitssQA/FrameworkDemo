Feature: GitHub Profile Search Component Responsiveness
  As a user
  I want the GitHub profile search component to adapt to different screen sizes and orientations
  So that I can use the application on any device

  Background:
    Given the GitHub profile search component is accessible and functional
    And there is an active connection to the GitHub API
    And a test user with followers exceeding the container size exists

  @responsive @desktop
  Scenario: Validate component layout on Desktop resolution
    Given I access the GitHub profile search component on a Desktop browser with resolution "1920x1080"
    Then the component should display with a layout optimized for Desktop
    And all sections should be visible including search input, profile section, metrics dashboard, and followers list
    When I search for a valid GitHub user "octocat"
    Then the profile section should be displayed on the left side
    And the metrics dashboard should be displayed correctly
    And the followers list should be displayed on the right side
    And all sections should be distributed adequately for Desktop resolution

  @responsive @mobile @portrait
  Scenario: Validate component layout on Mobile Portrait orientation
    Given I access the GitHub profile search component on a Desktop browser with resolution "1920x1080"
    And I search for a valid GitHub user "octocat"
    When I resize the browser to Mobile Portrait resolution "375x667"
    Then the layout should automatically adapt to vertical mobile orientation
    And the sections should be reorganized in a stacked layout
    And the search input should be visible and accessible
    And the search button with magnifying glass icon should be visible and functional
    And the user profile section should be readable
    And the metrics dashboard should be visible without loss of information
    And the followers list should be accessible

  @responsive @mobile @landscape
  Scenario: Validate component layout on Mobile Landscape orientation
    Given I access the GitHub profile search component on a Desktop browser with resolution "1920x1080"
    And I search for a valid GitHub user "octocat"
    When I resize the browser to Mobile Landscape resolution "667x375"
    Then the layout should automatically adapt to horizontal mobile orientation
    And all elements should be legible and accessible
    And the search input should be visible and functional
    And the search button should be visible and functional
    And the user profile section should be readable
    And the metrics dashboard should display all counters correctly
    And the followers list should be accessible without loss of functionality

  @responsive @scroll
  Scenario: Validate followers list scroll functionality across all resolutions
    Given I access the GitHub profile search component on a Desktop browser with resolution "1920x1080"
    And I search for a valid GitHub user "octocat" with followers exceeding the container size
    Then the followers list should allow scrolling on Desktop resolution
    When I resize the browser to Mobile Portrait resolution "375x667"
    Then the followers list should allow scrolling on Mobile Portrait
    When I resize the browser to Mobile Landscape resolution "667x375"
    Then the followers list should allow scrolling on Mobile Landscape
    And I should be able to view all followers by scrolling in each resolution