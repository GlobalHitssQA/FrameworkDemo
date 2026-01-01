Feature: Verify user biography display in GitHub Profile Search

  Scenario: Display user biography correctly from GitHub profile
    Given the user is on the GitHub Profile Search component
    When the user enters a valid GitHub username with biography "addyosmani"
    And the user clicks the search button
    Then the profile section should be visible
    And the biography field should be present
    And the biography should display "Engineering Lead at Google working on Chrome & Web Platform"

  Scenario: Display not available message when user has no biography
    Given the user is on the GitHub Profile Search component
    When the user enters a valid GitHub username without biography "torvalds"
    And the user clicks the search button
    Then the profile section should be visible
    And the biography field should show "Not available"