Feature: Validate User Profile Left Section Details
  As a user of the GitHub Profile Finder application
  I want to verify that the left section of a user profile displays all personal details correctly
  So that I can view complete user information and handle empty fields appropriately

  Background:
    Given the GitHub Profile Finder application is accessible
    And the GitHub API is available

  Scenario: Validate complete profile details with empty fields handling
    Given I am on the GitHub Profile Finder page
    When I search for a GitHub user with some empty profile fields
    Then the user profile should load successfully
    And the user avatar should be displayed correctly in the left section
    And the full name and username should be visible
    And the biography field should display the text or show "No disponible" if empty
    And the location field should display the value or show "No disponible" if empty
    And the company field should display the value or show "No disponible" if empty
    And the website link field should display the URL or show "No disponible" if empty
    And the Follow button should be visible and enabled
    And all empty fields should consistently show the defined behavior