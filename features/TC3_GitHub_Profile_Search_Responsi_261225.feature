Feature: GitHub Profile Search Responsive Design Validation
  As a user
  I want the GitHub profile search interface to adapt correctly to mobile devices
  So that I can use the application comfortably in both portrait and landscape orientations

  Background:
    Given the GitHub API is available
    And the browser developer tools can simulate mobile views

  @responsive @mobile @portrait
  Scenario: Validate interface adaptation in portrait mode
    Given I access the GitHub profile search component in portrait mode with dimensions 375x667
    Then the interface should load and adapt correctly to portrait orientation
    And the search field should be visible and accessible
    And the search button should be visible and accessible

  @responsive @mobile @portrait @search
  Scenario: Perform search and validate results in portrait mode
    Given I access the GitHub profile search component in portrait mode with dimensions 375x667
    When I enter a valid GitHub username "octocat" in the search field
    And I click the search button
    Then the search results should be displayed adapted to portrait orientation
    And the user avatar should be visible with appropriate size
    And the full name "The Octocat" should be displayed
    And the username "octocat" should be displayed
    And the followers count should be visible
    And the following count should be visible
    And the location "San Francisco" should be displayed
    And the user profile elements should be arranged vertically

  @responsive @mobile @portrait @accessibility
  Scenario: Verify element accessibility in portrait mode
    Given I access the GitHub profile search component in portrait mode with dimensions 375x667
    And I have searched for user "octocat"
    Then all text elements should be readable with minimum font size
    And the Follow button should be clickable
    And the followers list should allow scrolling
    And the avatar image should have appropriate dimensions for mobile

  @responsive @mobile @landscape
  Scenario: Validate interface adaptation when rotating to landscape
    Given I access the GitHub profile search component in portrait mode with dimensions 375x667
    When I rotate the device to landscape orientation with dimensions 667x375
    Then the interface should automatically adapt to landscape orientation
    And the elements should redistribute to take advantage of the additional width

  @responsive @mobile @landscape @layout
  Scenario: Verify component layout in landscape mode
    Given I access the GitHub profile search component in landscape mode with dimensions 667x375
    And I have searched for user "octocat"
    Then the metrics dashboard should be visible and properly sized
    And the user details section should be visible
    And the followers list should be accessible
    And all elements should maintain appropriate proportions
    And all interactive elements should be accessible

  @responsive @mobile @landscape @search
  Scenario: Perform new search in landscape mode
    Given I access the GitHub profile search component in landscape mode with dimensions 667x375
    When I enter a valid GitHub username "github" in the search field
    And I click the search button
    Then the search field should function correctly
    And the results should be displayed adapted to landscape orientation
    And all content should be readable and usable

  @responsive @mobile @navigation
  Scenario: Verify follower links work in both orientations
    Given I access the GitHub profile search component in portrait mode with dimensions 375x667
    And I have searched for user "octocat"
    When I click on a follower profile link
    Then I should be redirected to the follower GitHub profile page
    When I navigate back and rotate to landscape orientation with dimensions 667x375
    And I click on a follower profile link
    Then I should be redirected to the follower GitHub profile page