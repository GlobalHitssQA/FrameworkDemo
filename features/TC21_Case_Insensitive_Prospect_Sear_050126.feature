Feature: Case Insensitive Prospect Search in Acticenter

  Scenario: Verify prospect search is case insensitive
    Given I access the prospect search field in Acticenter
    When I enter a prospect name in lowercase letters
    Then the search executes and returns matching prospects
    When I enter the same prospect name in uppercase letters
    Then the search returns the same results regardless of case
    When I enter the prospect name in mixed case letters
    Then the search returns consistent results ignoring case sensitivity
    And the search executes without character maximum restrictions affecting case sensitivity