Feature: Prospect Search Validation
  As an advisor
  I want to validate that the search engine does not execute searches with insufficient characters
  So that the system prevents inefficient queries and maintains optimal performance

  Scenario: Validate search is not triggered with single character input
    Given the advisor is on the Acticenter dashboard prospect search interface
    When the advisor enters 1 character in the prospect search field
    Then the system does not trigger search execution
    And no search results are displayed
    And a message indicating insufficient characters for search is shown
    And the last 5 searches performed by the advisor are displayed
    When the advisor clicks the search icon button
    Then the system prevents search execution and maintains the no results state