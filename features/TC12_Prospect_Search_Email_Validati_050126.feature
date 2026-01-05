Feature: Prospect Search Email Validation

  Scenario: Verify electronic email key is displayed for each prospect in search results
    Given the advisor is logged into Acticenter dashboard
    When the advisor enters a prospect name in the search field
    And the advisor executes the search operation
    Then search results are displayed
    And each search result entry displays the prospect's electronic email key
    And the electronic email key is in valid email format