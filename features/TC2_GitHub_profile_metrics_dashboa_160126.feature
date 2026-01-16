Feature: GitHub profile metrics dashboard display

  As a user of the GitHub Profile Finder application
  I want to see the profile metrics prominently displayed
  So that I can quickly understand the user's GitHub activity

  Scenario: Verify dashboard displays correct metrics for Repos, Followers, Following and Gists
    Given the GitHub Profile Finder application is loaded
    When I enter a valid GitHub username in the search field
    And I click the search button
    Then the profile information should be displayed
    And the Repos counter should display the total public repositories
    And the Followers counter should display the total followers count
    And the Following counter should display the total following count
    And the Gists counter should display the total public gists count