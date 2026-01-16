Feature: User profile details section verification
  As a user of the GitHub Profile Finder application
  I want to see complete profile information in the left section
  So that I can view all personal details of a GitHub user

  Scenario: Verify all user profile details are displayed correctly
    Given I am on the GitHub Profile Finder application
    When I enter a GitHub username with complete profile information
    And I click the search button
    Then I should see the user avatar displayed
    And I should see the full name and username displayed
    And I should see the biography section
    And I should see the location information
    And I should see the company information
    And I should see the web link as a functional hyperlink
    And I should see the Follow button