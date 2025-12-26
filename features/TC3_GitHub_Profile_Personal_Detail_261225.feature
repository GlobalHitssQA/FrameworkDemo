Feature: GitHub Profile Personal Details Validation

  Scenario: Validate that the system displays profile personal details correctly including handling of empty fields
    Given the user accesses the GitHub profile search component
    Then the search input field and search button with magnifying glass icon should be enabled
    When the user enters a valid GitHub username with some empty profile fields in the search field
    Then the system accepts and displays the entered text in the search field
    When the user clicks the search button with magnifying glass icon
    Then the system queries the GitHub API and retrieves the profile data
    And the user avatar image should be displayed in the left section
    And the full name and username should be displayed correctly
    And the biography field should display the content or show empty if not available
    And the location and company fields should display data or show empty if not available
    And the personal web link should display the URL or show empty if not available
    And the Follow button should be visible and enabled