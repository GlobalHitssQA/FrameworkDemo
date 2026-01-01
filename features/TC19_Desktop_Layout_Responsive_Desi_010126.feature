Feature: Desktop Layout Responsive Design for GitHub Profile Search

  Scenario: Verify desktop layout displays correctly with two-column design and responsive adaptation
    Given the user opens the GitHub profile search application on a desktop browser with resolution 1920x1080
    When the user enters a valid GitHub username in the search field
    And the user clicks the search button to load the profile
    Then the profile information is retrieved and displayed successfully
    And the layout displays user details on the left and followers list on the right side by side
    And all UI elements including avatar, metrics, personal info and followers list are properly sized and spaced
    When the user resizes the browser window to different desktop resolutions
    Then the layout adapts responsively maintaining proper proportions and readability