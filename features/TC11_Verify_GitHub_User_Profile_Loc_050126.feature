Feature: Verify GitHub User Profile Location Display

Scenario: Verify that user location is displayed correctly in the profile
  Given the user navigates to the GitHub profile page
  When the user searches for a GitHub username with location data
  And the search button is clicked
  Then the location field should be visible in the user details section
  And the location value should match the API response data
  When the user searches for a profile without location data
  Then the location field should not be present or should display empty