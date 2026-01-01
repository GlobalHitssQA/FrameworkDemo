Feature: GitHub Profile Read-Only Verification
  As a user viewing a GitHub profile
  I want to verify that profile information is displayed as read-only
  So that I can confirm no unauthorized modifications are possible

  Scenario: Verify profile fields are read-only and no editing controls exist
    Given the user navigates to a GitHub user profile page
    When the profile is fully loaded with user information
    Then all profile fields should be displayed as read-only text
    And no edit buttons or save buttons should be present
    And clicking on profile text fields should not enable editing mode
    And only navigation links and external Follow button should be interactive