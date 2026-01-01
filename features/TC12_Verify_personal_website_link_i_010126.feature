Feature: Verify personal website link in GitHub user profile

  Scenario: User can view and click on personal website link from user profile
    Given the user navigates to the GitHub profile search component
    And the search component is loaded and displayed
    When the user enters a valid GitHub username that has a personal website link
    And the user clicks the search button to retrieve the profile
    Then the system successfully loads the user profile
    And the left section displays the user personal details
    And the personal website link is displayed as a clickable hyperlink with the correct URL
    When the user clicks on the personal website link
    Then the system redirects to the personal website in a new tab