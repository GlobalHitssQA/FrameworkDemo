Feature: Verify website link display for GitHub profile without website

  Scenario: Website link field displays correctly when user has no website configured
    Given the user is on the GitHub profile search application
    When the user searches for a GitHub username without a website link
    Then the profile loads successfully
    And the user information section is displayed
    And the website link field is empty or shows not available
    And other profile fields with data are displayed correctly