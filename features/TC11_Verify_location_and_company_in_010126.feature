Feature: Verify location and company information display in GitHub profile search

  Scenario: User searches for a GitHub profile and verifies location and company information
    Given the user navigates to the GitHub profile search component
    And the search component is loaded and ready to use
    When the user enters a valid GitHub username with location and company information
    And the user clicks the search button
    Then the system retrieves the user profile information
    And the left section displays the user personal details
    And the location field displays the user location data correctly
    And the company field displays the user current workplace data correctly