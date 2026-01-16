Feature: GitHub Profile Personal Information Display
  As a user of the GitHub Profile Finder
  I want to see complete personal information of a GitHub user
  So that I can view their avatar, name, biography, location, company, web link and follow button

  Scenario: Verify personal information is displayed correctly in the left section of the profile
    Given the user navigates to the GitHub profile search application
    When the user searches for a GitHub user with complete profile information
    Then the user avatar should be displayed in the left section
    And the full name and username should be displayed correctly
    And the biography should be displayed in the profile section
    And the location and company should be displayed correctly
    And the web link should be displayed and clickable
    And the Follow button should be visible and functional
    And empty fields should display appropriate empty state or not available message