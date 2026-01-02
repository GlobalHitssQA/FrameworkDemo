Feature: Case-insensitive prospect search in Acticenter
  As an authenticated advisor
  I want to search for prospects using different character cases
  So that I can find prospects regardless of how I type their names

  Scenario: Verify prospect search is case-insensitive
    Given I am authenticated as an advisor on the Acticenter dashboard
    And the prospect search functionality is available
    When I enter a search query in all lowercase characters for a known prospect
    And I execute the search
    Then the search results should display matching prospects
    When I clear the search field
    And I enter the same search query in all uppercase characters
    And I execute the search
    Then the search results should match the previous lowercase search results
    When I clear the search field
    And I enter the same search query in mixed case characters
    And I execute the search
    Then the search results should match the previous search results
    And the case-insensitive search behavior is confirmed