Feature: Tablet Responsive Design Verification

  Scenario: Verify GitHub profile search application adapts correctly to tablet portrait and landscape views
    Given the application loads in default desktop view
    When the browser is resized to tablet portrait view with 768px width
    Then the search component should remain accessible and properly sized
    And the search input and button should be appropriately sized for tablet portrait
    When a GitHub user is searched
    Then the metrics dashboard should display correctly with Repos, Followers, Following, and Gists visible
    And the user profile section should display avatar, name, username, bio, location, company, web link, and Follow button
    And the followers list should adapt appropriately to tablet portrait width with proper spacing and scrolling
    When the browser is rotated to tablet landscape view with 1024px width
    Then the interface should adapt to landscape orientation with appropriate horizontal space usage
    And all interactive elements should have sufficient tap target size of minimum 44x44px
    And no horizontal scrolling should be required with all content visible within viewport bounds