Feature: GitHub Profile Left Section Details Validation
  As a user of the GitHub Profile Finder
  I want to see complete profile details in the left section
  So that I can view all personal information of a GitHub user

  Scenario: Verify left section displays all profile details for user with complete information
    Given I navigate to the GitHub Profile Finder application
    When I enter a username with complete profile information in the search field
    And I click the search button
    Then I should see the user avatar displayed correctly
    And I should see the full name and username with at symbol
    And I should see the user biography
    And I should see the location and company information
    And I should see the personal website link as clickable
    And I should see the Follow button
    When I search for a user with incomplete profile information
    Then I should see empty fields or not available message without interface errors