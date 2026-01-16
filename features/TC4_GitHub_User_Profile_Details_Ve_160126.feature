Feature: GitHub User Profile Details Verification
  As a user of the GitHub Profile Search component
  I want to see all personal details of a searched user
  So that I can view complete profile information

  Scenario: Verify all personal details are displayed correctly for a user with complete profile
    Given I am on the GitHub profile search page
    When I search for a user with complete profile information
    Then I should see the left section with profile details
    And I should see the user avatar image
    And I should see the full name and username with @ format
    And I should see the user biography
    And I should see the location and company information
    And I should see the web link
    And I should see the Follow button
    When I search for a user with incomplete profile information
    Then I should see empty fields or not available message for missing data