Feature: GitHub Profile Search Component Responsive Design
  As a user of the GitHub Profile Search component
  I want the interface to adapt correctly to different resolutions and orientations
  So that I can use the application on Desktop, Mobile Portrait, and Mobile Landscape

  Background:
    Given the GitHub API connection is active
    And the GitHub Profile Search component is accessible and functional

  @responsive @desktop
  Scenario: Verify desktop layout displays all sections correctly
    Given I access the GitHub Profile Search component in Desktop resolution "1920x1080"
    Then the component should display with desktop-optimized design
    And all sections should be visible including search input, profile area, and followers list
    When I search for a valid GitHub user "torvalds"
    Then the profile section should display on the left side
    And the metrics dashboard should display repositories, followers, following, and gists counters
    And the followers list should display on the right section
    And all sections should be properly distributed for desktop resolution

  @responsive @mobile @portrait
  Scenario: Verify mobile portrait layout adapts correctly
    Given I access the GitHub Profile Search component in Desktop resolution "1920x1080"
    And I search for a valid GitHub user "torvalds"
    When I change the browser resolution to Mobile Portrait "375x667"
    Then the layout should automatically adapt to vertical mobile orientation
    And the sections should be reorganized in a stacked layout
    And the search input should be visible and accessible
    And the search button with magnifying glass icon should be visible and accessible
    And the user profile section should be visible and readable
    And the metrics counters should be visible and readable
    And the followers list should be visible and accessible
    And all components should maintain their functionality

  @responsive @mobile @landscape
  Scenario: Verify mobile landscape layout adapts correctly
    Given I access the GitHub Profile Search component in Mobile Portrait resolution "375x667"
    And I search for a valid GitHub user "torvalds"
    When I change the browser resolution to Mobile Landscape "667x375"
    Then the layout should automatically adapt to horizontal mobile orientation
    And all elements should be legible and accessible
    And the search input should be visible and functional
    And the search button should be visible and functional
    And the user profile information should be visible
    And the metrics dashboard should be visible
    And the followers list should be visible and accessible
    And all components should maintain their functionality

  @responsive @scroll
  Scenario: Verify followers list scroll functionality across all resolutions
    Given I access the GitHub Profile Search component in Desktop resolution "1920x1080"
    And I search for a GitHub user with many followers "torvalds"
    Then the followers list should allow scrolling when followers exceed container size
    When I change the browser resolution to Mobile Portrait "375x667"
    Then the followers list should allow scrolling in Portrait orientation
    When I change the browser resolution to Mobile Landscape "667x375"
    Then the followers list should allow scrolling in Landscape orientation