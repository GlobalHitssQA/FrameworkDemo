Feature: GitHub Profile Search Dashboard Metrics

  Scenario: Validate dashboard metrics display for existing GitHub user
    Given I access the GitHub profile search application
    And the search component is displayed with input field and search button
    When I enter a valid GitHub username "octocat" in the search field
    And I click the search button with magnifying glass icon
    And I wait for the API response to complete
    Then the user profile information is loaded successfully
    And the Repos metric counter is displayed with a valid numeric value
    And the Followers metric counter is displayed with a valid numeric value
    And the Following metric counter is displayed with a valid numeric value
    And the Gists metric counter is displayed with a valid numeric value
    And all metric counters show integer values greater than or equal to zero
    And the API request limit indicator is displayed in format "Requests X/Y"