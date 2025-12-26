Feature: GitHub Profile Search
  As a user of the GitHub Profile Search application
  I want to search for GitHub users by username
  So that I can view their profile information and metrics

  Background:
    Given the GitHub API is available
    And I have access to the profile search component

  Scenario: Successfully search and display an existing GitHub user profile
    Given I am on the GitHub Profile Search page
    When I verify the search component is displayed
    Then I should see a text input field for username search
    And I should see a search button with a magnifying glass icon

    When I enter a valid GitHub username "octocat" in the search field
    Then the entered text "octocat" should be displayed in the input field

    When I click the search button
    Then the system should query the GitHub API
    And the API response should be successful

    When the profile data is loaded
    Then I should see the metrics dashboard with the following counters:
      | metric    |
      | Repos     |
      | Followers |
      | Following |
      | Gists     |

    And I should see the user information section on the left with:
      | element       |
      | Avatar        |
      | Full Name     |
      | Username      |
      | Biography     |
      | Location      |
      | Company       |
      | Website Link  |
      | Follow Button |

    And I should see the followers list section on the right
    And each follower should display:
      | element         |
      | Avatar          |
      | Username        |
      | Profile Link    |