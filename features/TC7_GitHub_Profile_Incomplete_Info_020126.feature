Feature: GitHub Profile Incomplete Information Display

  Scenario: Verify incomplete profile displays 'Not available' for missing fields
    Given the GitHub profile search application is loaded
    When I enter a GitHub username with incomplete profile information
    And I click the search button
    Then the user profile section is displayed
    And fields with missing data display 'Not available' text
    And location field shows 'Not available' when data is missing
    And biography field shows 'Not available' when data is missing
    And company field shows 'Not available' when data is missing
    And web link field shows 'Not available' when data is missing