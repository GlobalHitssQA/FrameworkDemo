Feature: Verify GitHub Profile Desktop Responsive Layout

  Scenario: Validate profile layout adapts properly across desktop resolutions
    Given the browser is opened with resolution 1920x1080
    When the user navigates to a GitHub user profile with complete information
    Then the profile interface should load properly scaled for desktop view
    And the left section should display user avatar, name, bio, location, company, and web link
    And the right section should display pinned repositories and contribution activity
    And the metrics dashboard should display Repos, Followers, Following, and Stars at the top navigation
    When the browser window is resized to different desktop widths between 1024px and 1920px
    Then the layout should adapt responsively maintaining proper proportions and readability