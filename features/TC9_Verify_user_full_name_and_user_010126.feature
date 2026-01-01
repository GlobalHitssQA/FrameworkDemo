Feature: Verify user full name and username display in profile section

  Scenario: User full name and username are displayed correctly after search
    Given the user navigates to the GitHub Profile Search component
    When the user enters a valid GitHub username with full name and username data
    And the user clicks the search button
    Then the profile section should be displayed on the left side
    And the full name should be displayed correctly
    And the username should be displayed with the at symbol prefix