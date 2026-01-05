Feature: Focus State Validation

  Scenario: Verify focus states for interactive elements in GitHub profile search
    Given the user navigates to the GitHub profile search interface
    When the user clicks on the search input field
    Then the input field should display a visible focus state
    When the user clicks on the search button
    Then the search button should show a focus state with visual indicator
    When the user searches for a valid GitHub user
    And the user clicks on the Follow button
    Then the Follow button should display a focus state
    When the user clicks on the web link in the profile section
    Then the web link should show a focus state with visual feedback
    When the user clicks on a follower link in the followers list
    Then the follower link should display a focus state correctly
    When the user navigates using Tab key
    Then keyboard focus states should match click-based focus states