Feature: Follow Button Redirects to External GitHub Profile

  Scenario: Verify Follow button redirects to GitHub profile page
    Given a GitHub user profile is loaded in the search component
    And the profile displays all user details including the Follow button
    When I locate the Follow button in the user details section
    Then the Follow button is visible and properly labeled
    When I click the Follow button
    Then the system initiates a redirect to the external GitHub platform
    And the redirect opens the correct GitHub profile page
    And the external page URL matches the GitHub profile URL for the searched user