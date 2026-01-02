Feature: GitHub User Profile Information Display

  Scenario: Verify complete profile information is displayed for a GitHub user
    Given the user navigates to GitHub search page
    When the user searches for a GitHub user with complete profile information
    Then the user profile is retrieved successfully
    And the user avatar image is displayed in the left section
    And the full name and username with at prefix are displayed correctly
    And the biography text is visible and readable
    And the location and company information are displayed if available
    And the personal web link is displayed and formatted correctly
    And the Follow button is present and visible