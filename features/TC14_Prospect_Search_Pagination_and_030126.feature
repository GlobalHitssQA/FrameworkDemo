Feature: Prospect Search Pagination and Scroll
  As an advisor user
  I want to search for prospects and view all results through scrolling
  So that I can access all matching prospects from Salesforce

  Scenario: Verify prospect search results display with scroll pagination
    Given I am logged in to Acticenter dashboard as an advisor user
    When I navigate to the prospect search functionality
    And I enter a search term that returns more than 5 results
    Then the search is executed and multiple matches are found
    And I verify that 5 results are initially displayed on screen
    When I use scroll functionality to view additional results
    Then the scroll mechanism works and additional results beyond the sixth are displayed
    And I verify all search results can be accessed through scrolling