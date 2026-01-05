Feature: GitHub Profile Information Display
  As a user of the GitHub Profile Search application
  I want to view complete profile information of a GitHub user
  So that I can see their avatar, name, bio, location, company, website, and follow option

  Scenario: Verify all profile information fields are displayed correctly
    Given the user navigates to the GitHub Profile Search application
    When the user enters a valid GitHub username with complete profile information
    And the user clicks the search button
    Then the user avatar should be displayed in the left section
    And the full name and username should be displayed
    And the biography should be displayed or show as not available
    And the location field should be displayed or show as empty
    And the company field should be displayed or show as empty
    And the web link should be displayed as a clickable hyperlink or show as empty
    And the follow button should be visible and functional
    And all fields should be properly aligned in the left section