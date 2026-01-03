Feature: Prospect Search Display Validation
  As an advisor user
  I want to search for prospects in the system
  So that I can view prospect names in the search results

  Scenario: Verify prospect name is displayed in search results
    Given I am logged into the Acticenter dashboard as an advisor
    When I navigate to the prospect search functionality
    And I enter a valid search term with at least 2 characters
    And I execute the search
    Then the search results should be displayed
    And each result should display the prospect name