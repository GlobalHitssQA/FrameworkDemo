Feature: Validate profile details section displays complete user information

  Scenario: Verify left section shows all personal details of a searched GitHub profile
    Given the user is on the GitHub Profile Finder application
    When the user searches for a GitHub user with complete profile information
    Then the user avatar should be displayed in the left section
    And the full name and username should be displayed correctly
    And the biography should be displayed or show not available message
    And the location and company information should be displayed
    And the personal website link should be displayed as clickable
    And the Follow button should be visible in the profile section