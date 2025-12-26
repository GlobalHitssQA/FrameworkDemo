Feature: GitHub User Profile Information Display
  As a user of the GitHub Profile Search application
  I want to see complete profile information in the left section
  So that I can view all personal details of a GitHub user

  Background:
    Given the GitHub profile search interface is accessible

  @TC-003 @functional @profile-details
  Scenario: Validate complete user profile information display
    Given I am on the GitHub user search page
    When I search for an existing user "torvalds" with complete profile information
    Then the system should successfully retrieve the user profile
    And the user avatar should be displayed correctly in the left section
    And the full name "Linus Torvalds" should be displayed
    And the username should be displayed with format "@torvalds"
    And the user biography should be displayed if available
    And the location "Portland, OR" should be displayed
    And the organization "Linux Foundation" should be displayed
    And the personal website link should be displayed if available
    And the Follow button should be visible for external GitHub following

  @TC-003 @functional @profile-incomplete
  Scenario: Validate profile display with missing fields
    Given I am on the GitHub user search page
    When I search for a user with incomplete profile information
    Then fields without information should appear empty or show "No disponible"
    And the avatar should still be displayed
    And the username should still be displayed